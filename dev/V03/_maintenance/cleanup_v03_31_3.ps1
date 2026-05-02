# ODIN V03.31.3 — cleanup helper
# Запускати з кореня репозиторію:
# C:\Users\Vitalii\OneDrive\Документы\GitHub\odin-interface

$ErrorActionPreference = "SilentlyContinue"

Remove-Item "dev\V03\11_PROTOTYPE_SYSTEM_UI\commit_builder.html"
Remove-Item "dev\V03\11_PROTOTYPE_SYSTEM_UI\state_workspace.html"
Remove-Item "dev\V03\11_PROTOTYPE_SYSTEM_UI\commit_builder.css"
Remove-Item "dev\V03\11_PROTOTYPE_SYSTEM_UI\commit_builder.js"
Remove-Item "dev\V03\11_PROTOTYPE_SYSTEM_UI\README_v03_31_2.md"
Remove-Item "dev\V03\11_PROTOTYPE_SYSTEM_UI\README_v03_31_3.md"

Write-Host "ODIN cleanup V03.31.3 done. Перевір: dir dev\V03\11_PROTOTYPE_SYSTEM_UI"
