param(
  [ValidateSet("patch","minor","major")]
  [string]$Bump = "patch",

  [string]$Message = ""
)

$ErrorActionPreference = "Stop"

if (!(Test-Path "VERSION")) {
  "3.21.0" | Out-File -Encoding utf8 "VERSION"
}

$current = (Get-Content "VERSION" -Raw).Trim()

if ($current -notmatch '^\d+\.\d+\.\d+$') {
  throw "VERSION must be like 3.21.0"
}

$parts = $current.Split(".")
$major = [int]$parts[0]
$minor = [int]$parts[1]
$patch = [int]$parts[2]

switch ($Bump) {
  "patch" { $patch++ }
  "minor" { $minor++; $patch = 0 }
  "major" { $major++; $minor = 0; $patch = 0 }
}

$newVersion = "$major.$minor.$patch"
$newTag = "v$newVersion"

$newVersion | Out-File -Encoding utf8 "VERSION"

git add .

if ([string]::IsNullOrWhiteSpace($Message)) {
  $Message = "release $newTag"
}

git commit -m $Message
git push

git tag $newTag
git push origin $newTag

Write-Host ""
Write-Host "DONE: $newTag pushed successfully." -ForegroundColor Green
