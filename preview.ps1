param([ValidateRange(1024, 65535)][int]$Port = 4173)

$ErrorActionPreference = 'Stop'
$siteDirectory = Join-Path $PSScriptRoot 'dist'
$bundledPython = Join-Path $env:USERPROFILE '.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe'

if (-not (Test-Path -LiteralPath (Join-Path $siteDirectory 'index.html'))) {
    throw 'The dist/index.html entry point is missing.'
}

if (Test-Path -LiteralPath $bundledPython) {
    $sitePython = $bundledPython
} else {
    $sitePython = (Get-Command python -ErrorAction Stop).Source
}

Write-Host "Preview: http://127.0.0.1:$Port/"
Write-Host 'Press Ctrl+C to stop the local preview server.'
& $sitePython -m http.server $Port --bind 127.0.0.1 --directory $siteDirectory
