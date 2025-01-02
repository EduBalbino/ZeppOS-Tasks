#!/usr/bin/env pwsh
# A way to compile TypeScript base projects for ZeppOS.

# Remove new directory if it exists
if (Test-Path -Path "./new") {
    Remove-Item -Path "./new" -Recurse -Force
}

# Create new directory
New-Item -Path "./new" -ItemType Directory -Force

# Compile TypeScript files using existing tsconfig
tsc --project . --outDir "./new"

# Define excluded paths
$excludedPaths = @(
    "node_modules",
    ".git",
    "dist",
    "new",
    "build.ps1",
    "tsconfig.json",
    "documentation_ZEPPOS"
)

# Copy all non-TypeScript files
Get-ChildItem -Path "." -Recurse -File | 
    Where-Object { 
        # Skip excluded paths and .git files
        $relativePath = $_.FullName.Substring($PWD.Path.Length + 1)
        $isExcluded = $false
        foreach ($excluded in $excludedPaths) {
            if ($relativePath -like "$excluded*") {
                $isExcluded = $true
                break
            }
        }
        -not $isExcluded -and -not ($_.Name -match "^\.git.*")
    } | ForEach-Object {
        # Calculate relative path and create target path
        $relativePath = $_.FullName.Substring($PWD.Path.Length + 1)
        $targetPath = Join-Path "./new" $relativePath
        
        # Create parent directory if it doesn't exist
        $parentDir = Split-Path -Parent $targetPath
        if (!(Test-Path $parentDir)) {
            New-Item -Path $parentDir -ItemType Directory -Force | Out-Null
        }
        
        # Copy the file
        Copy-Item -Path $_.FullName -Destination $targetPath -Force
    }

# Clean up any .ts files that might have been copied
Get-ChildItem -Path "./new" -Recurse -Filter "*.ts" | Remove-Item -Force
