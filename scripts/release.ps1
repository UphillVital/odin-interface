param(
  [ValidateSet("patch","minor","major")]
  [string]$Bump = "patch",

  [string]$Message = ""
)

$ErrorActionPreference = "Stop"

# 1. VERSION file
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

if ([string]::IsNullOrWhiteSpace($Message)) {
  $Message = "release $newTag"
}

# 2. Write VERSION
$newVersion | Out-File -Encoding utf8 "VERSION"

# 3. CHANGELOG
if (!(Test-Path "CHANGELOG.md")) {
  "# CHANGELOG`n" | Out-File -Encoding utf8 "CHANGELOG.md"
}

$date = Get-Date -Format "yyyy-MM-dd"
$oldChangelog = Get-Content "CHANGELOG.md" -Raw

$newEntry = @"
## $newTag — $date
- $Message

"@

# Keep title at top if present
if ($oldChangelog.StartsWith("# CHANGELOG")) {
  $lines = $oldChangelog -split "`r?`n", 2
  if ($lines.Length -gt 1) {
    $updated = $lines[0] + "`n`n" + $newEntry + $lines[1].TrimStart()
  } else {
    $updated = $lines[0] + "`n`n" + $newEntry
  }
} else {
  $updated = "# CHANGELOG`n`n" + $newEntry + $oldChangelog
}

$updated | Out-File -Encoding utf8 "CHANGELOG.md"

# 4. Git
git add .
git commit -m $Message
git push

# 5. Tag
git tag $newTag
git push origin $newTag

Write-Host ""
Write-Host "DONE: $newTag pushed successfully." -ForegroundColor Green
Write-Host "CHANGELOG.md updated." -ForegroundColor Green
