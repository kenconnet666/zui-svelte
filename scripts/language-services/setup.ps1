#requires -Version 7.0
[CmdletBinding()]
param([switch]$Verify)

$ErrorActionPreference = 'Stop'
$repoPath = (Resolve-Path -LiteralPath (Join-Path $PSScriptRoot '../..')).Path
$nodeExecutable = (Get-Command node -CommandType Application | Select-Object -First 1).Source
$pnpmExecutable = (Get-Command pnpm | Select-Object -First 1).Source

# 固定依赖与启动路径，避免桌面宿主的 PATH、工作目录与终端不同。
$nodeMajor = & $nodeExecutable -p 'process.versions.node.split(".")[0]'
if ($nodeMajor -ne '24') { throw '请先选择 Node 24，再运行安装脚本。' }
& $pnpmExecutable --dir $repoPath install --frozen-lockfile
if ($LASTEXITCODE -ne 0) { throw '项目语言服务依赖安装失败。' }
& $pnpmExecutable --dir $repoPath run build:libs
if ($LASTEXITCODE -ne 0) { throw '库声明构建失败，Docs 的语言服务依赖真实 dist 入口。' }

$configPath = Join-Path $repoPath '.codex/config.toml'
$template = Get-Content -LiteralPath (Join-Path $repoPath '.codex/config.example.toml') -Raw
$paths = @{
    '__NODE__' = $nodeExecutable
    '__ROOT__' = $repoPath
    '__LSP__' = Join-Path $PSScriptRoot 'server.mjs'
    '__SVELTE__' = Join-Path $repoPath 'node_modules/@sveltejs/mcp/dist/index.mjs'
}
foreach ($entry in $paths.GetEnumerator()) {
    # JSON 字符串转义也适用于这里的 TOML 基本字符串；统一斜杠方便人工检查。
    $template = $template.Replace($entry.Key, (ConvertTo-Json -InputObject $entry.Value.Replace('\', '/') -Compress))
}
$managedPattern = '(?ms)^# BEGIN ZUI LANGUAGE SERVICES\r?\n.*?^# END ZUI LANGUAGE SERVICES[^\r\n]*'
$managed = [regex]::Match($template, $managedPattern).Value
$existing = if (Test-Path -LiteralPath $configPath) { Get-Content -LiteralPath $configPath -Raw } else { '' }
if ($existing -match $managedPattern) {
    $updated = [regex]::Replace($existing, $managedPattern, [System.Text.RegularExpressions.MatchEvaluator]{ param($match) $managed })
} elseif ($existing -match '(?m)^\[mcp_servers\.(zui_lsp|svelte)(\]|\.)') {
    throw '现有配置包含未由脚本管理的 zui_lsp/svelte；请先备份并移除这两节，再重试。其他设置应保留。'
} else {
    $updated = $existing.TrimEnd() + "`n" + $managed + "`n"
}
Set-Content -LiteralPath $configPath -Value $updated.TrimStart() -Encoding utf8NoBOM -NoNewline

if ($Verify) {
    # 读取 Codex 真正解析的配置，而非另构造一套能成功的启动参数。
    Push-Location $repoPath
    try {
        $configurations = foreach ($name in @('zui_lsp', 'svelte')) {
            $json = & codex mcp get $name --json
            if ($LASTEXITCODE -ne 0) { throw "Codex 未识别 $name；请检查项目是否受信任。" }
            $json | ConvertFrom-Json
        }
        ConvertTo-Json -InputObject @($configurations) -Depth 10 -Compress | & $nodeExecutable (Join-Path $PSScriptRoot 'smoke.mjs')
        if ($LASTEXITCODE -ne 0) { throw 'Codex 配置的 MCP 启动验收失败。' }
    } finally { Pop-Location }
    & $nodeExecutable (Join-Path $PSScriptRoot 'verify.mjs') $repoPath
    if ($LASTEXITCODE -ne 0) { throw '项目语言服务验收失败。' }
}
Write-Host '已生成本机项目配置并构建库声明。信任本项目后重载 Codex；当前任务工具列表仍需重载后验证。'
