# ODIN V03.31.4 — cleanup helper
# Запускати з кореня репозиторію:
# C:\Users\Vitalii\OneDrive\Документы\GitHub\odin-interface

$ErrorActionPreference = "SilentlyContinue"

Remove-Item "dev\V03\11_PROTOTYPE_SYSTEM_UI\commit_builder.html" -Force
Remove-Item "dev\V03\11_PROTOTYPE_SYSTEM_UI\state_workspace.html" -Force
Remove-Item "dev\V03\11_PROTOTYPE_SYSTEM_UI\commit_builder.css" -Force
Remove-Item "dev\V03\11_PROTOTYPE_SYSTEM_UI\commit_builder.js" -Force
Remove-Item "dev\V03\11_PROTOTYPE_SYSTEM_UI\README_v03_31_2.md" -Force
Remove-Item "dev\V03\11_PROTOTYPE_SYSTEM_UI\README_v03_31_3.md" -Force
Remove-Item "dev\V03\_packages\_packages\commit_builder.js" -Force
Remove-Item "dev\V03\_packages\_packages\state_workspace.js" -Force

Write-Host "ODIN cleanup V03.31.4 done. Перевір: dir dev\V03\11_PROTOTYPE_SYSTEM_UI"
