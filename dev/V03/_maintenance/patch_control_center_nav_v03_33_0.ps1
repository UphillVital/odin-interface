$ErrorActionPreference = "Stop"

$root = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
$prototype = Join-Path $root "11_PROTOTYPE_SYSTEM_UI\index.html"

if (Test-Path $prototype) {
  $content = Get-Content $prototype -Raw

  if ($content -notmatch "control_center\.html") {
    $content = $content -replace '(<a class="settings-link" href="../commit_builder\.html"[^>]*>.*?</a>)', '<a class="settings-link" href="../control_center.html">Центр керування</a>`n            $1'
    $content = $content -replace '(<a class="settings-link" href="commit_builder\.html"[^>]*>.*?</a>)', '<a class="settings-link" href="../control_center.html">Центр керування</a>`n            $1'
    $content = $content -replace '(<a class="tree-item" href="../commit_builder\.html"[^>]*>.*?</a>)', '<a class="tree-item" href="../control_center.html">Центр керування <span class="hint" tabindex="0">?</span></a>`n      $1'
    $content = $content -replace '(<a class="tree-item" href="commit_builder\.html"[^>]*>.*?</a>)', '<a class="tree-item" href="../control_center.html">Центр керування <span class="hint" tabindex="0">?</span></a>`n      $1'
  }

  Set-Content $prototype $content -Encoding UTF8
}

Write-Host "ODIN V03.33.0 Control Center navigation patch completed."
