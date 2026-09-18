#requires -Version 7.0
[CmdletBinding()]
param([switch]$Verify, [switch]$SkipRegistration)

$ErrorActionPreference = 'Stop'
$repoPath = (Resolve-Path -LiteralPath (Join-Path $PSScriptRoot '../..')).Path
$codexDirectory = if ($env:CODEX_HOME) { $env:CODEX_HOME } else { Join-Path $env:USERPROFILE '.codex' }
$toolDirectory = Join-Path $codexDirectory 'tools/zui-language-services'
$nodeExecutable = (Get-Command node -CommandType Application | Select-Object -First 1).Source
$pnpmExecutable = (Get-Command pnpm | Select-Object -First 1).Source
if (-not (Test-Path -LiteralPath (Join-Path $repoPath 'node_modules/typescript/lib'))) {
    throw '请先在项目根目录运行 pnpm install。'
}

# 版本与工作区统一管理，工具本身安装在用户目录。
$catalogJson = & $pnpmExecutable --dir $repoPath config get catalogs
if ($LASTEXITCODE -ne 0) { throw '无法读取 pnpm catalog。' }
$catalogs = $catalogJson | ConvertFrom-Json -AsHashtable
$dependencies = $catalogs.languageServices
if (-not $dependencies) { throw '缺少 languageServices catalog。' }
foreach ($name in @('svelte', 'typescript')) { $dependencies[$name] = $catalogs.default[$name] }
$workspacePackage = Get-Content -LiteralPath (Join-Path $repoPath 'package.json') -Raw -Encoding utf8 | ConvertFrom-Json
New-Item -ItemType Directory -Path $toolDirectory -Force | Out-Null
@{
    name = 'codex-zui-language-services'; version = '0.1.0'; private = $true; type = 'module'
    packageManager = $workspacePackage.packageManager; dependencies = $dependencies
} | ConvertTo-Json -Depth 8 | Set-Content -LiteralPath (Join-Path $toolDirectory 'package.json') -Encoding utf8
& $pnpmExecutable --dir $toolDirectory install --ignore-scripts
if ($LASTEXITCODE -ne 0) { throw '语言服务依赖安装失败。' }

if ($Verify) {
    & $nodeExecutable (Join-Path $PSScriptRoot 'verify.mjs') $repoPath $toolDirectory
    if ($LASTEXITCODE -ne 0) { throw '语言服务验收失败，未修改 Codex 配置。' }
}
if ($SkipRegistration) { return }

$codexExecutable = (Get-Command codex | Select-Object -First 1).Source
$configPath = Join-Path $codexDirectory 'config.toml'
if (Test-Path -LiteralPath $configPath) {
    $backupPath = "$configPath.zui-$(Get-Date -Format 'yyyyMMdd-HHmmss-fff').bak"
    Copy-Item -LiteralPath $configPath -Destination $backupPath
    Write-Host "Codex 配置备份：$backupPath"
}
# 只注册这两个具名服务，其他 MCP、模型与凭据配置交给 Codex CLI 原样保留。
& $codexExecutable mcp add zui_lsp -- $nodeExecutable (Join-Path $PSScriptRoot 'server.mjs') $repoPath $toolDirectory
if ($LASTEXITCODE -ne 0) { throw '注册 zui_lsp 失败。' }
& $codexExecutable mcp add svelte -- $nodeExecutable (Join-Path $toolDirectory 'node_modules/@sveltejs/mcp/dist/index.mjs')
if ($LASTEXITCODE -ne 0) { throw '注册 svelte 失败。' }

# 冷启动语义服务可能超过默认调用时限，只调整本工具的超时。
$config = Get-Content -LiteralPath $configPath -Raw -Encoding utf8
foreach ($name in @('zui_lsp', 'svelte')) {
    $pattern = '(?ms)^\[mcp_servers\.' + $name + '\]\r?\n(?<body>.*?)(?=^\[|\z)'
    $config = [regex]::Replace($config, $pattern, {
        param($match)
        $section = [regex]::Replace($match.Value, '(?m)^(startup_timeout_sec|tool_timeout_sec)\s*=.*\r?\n?', '')
        $section.TrimEnd() + "`nstartup_timeout_sec = 30`ntool_timeout_sec = 90`n`n"
    })
}
Set-Content -LiteralPath $configPath -Value $config -Encoding utf8 -NoNewline
Write-Host '已配置 zui_lsp 与 svelte。配置写入不代表当前任务已热加载，参见 design/language-services.md。'
