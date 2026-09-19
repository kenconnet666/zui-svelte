#requires -Version 7.0
[CmdletBinding()]
param([switch]$Verify)

$ErrorActionPreference = 'Stop'
$repoPath = (Resolve-Path -LiteralPath (Join-Path $PSScriptRoot '../..')).Path
$nodeExecutable = (Get-Command node -CommandType Application | Select-Object -First 1).Source
$pnpmExecutable = (Get-Command pnpm | Select-Object -First 1).Source

# 配置随仓库保存，依赖按锁文件安装；不再注册或改写全局 MCP。
& $pnpmExecutable --dir $repoPath install --frozen-lockfile
if ($LASTEXITCODE -ne 0) { throw '项目语言服务依赖安装失败。' }
if (-not (Test-Path -LiteralPath (Join-Path $repoPath '.codex/config.toml'))) {
    throw '缺少项目级 .codex/config.toml。'
}
if ($Verify) {
    & $nodeExecutable (Join-Path $PSScriptRoot 'verify.mjs') $repoPath
    if ($LASTEXITCODE -ne 0) { throw '项目语言服务验收失败。' }
}
Write-Host '已准备项目级语言服务。信任本项目后重载 Codex；配置存在不表示当前会话已热加载。'
