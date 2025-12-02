<#
.SYNOPSIS
    Adds folders and files from the parent directory to a .NET solution as solution folders.
.DESCRIPTION
    This script scans the parent directory of a .NET solution and adds all folders and files
    as solution folders/items, maintaining the directory structure without copying files.
.PARAMETER SolutionPath
    Path to the .sln file. If not provided, searches for a .sln file in the current directory.
.EXAMPLE
    .\Add-ParentFoldersToSolution.ps1
    .\Add-ParentFoldersToSolution.ps1 -SolutionPath ".\MySolution\MySolution.sln"
#>
param(
    [Parameter(Mandatory=$false)]
    [string]$SolutionPath
)
function Get-SolutionFile {
    param([string]$Path)
    
    if ($Path) {
        if (Test-Path $Path) {
            return (Resolve-Path $Path).Path
        }
        Write-Error "Solution file not found: $Path"
        exit 1
    }
    
    $slnFiles = Get-ChildItem -Path . -Filter "*.sln" -File
    
    if ($slnFiles.Count -eq 0) {
        Write-Error "No .sln file found in current directory"
        exit 1
    }
    
    if ($slnFiles.Count -gt 1) {
        Write-Host "Multiple .sln files found. Please select one:"
        for ($i = 0; $i -lt $slnFiles.Count; $i++) {
            Write-Host "[$i] $($slnFiles[$i].Name)"
        }
        $selection = Read-Host "Enter selection"
        return $slnFiles[$selection].FullName
    }
    
    return $slnFiles[0].FullName
}
function New-Guid {
    return [System.Guid]::NewGuid().ToString().ToUpper()
}
function Get-RelativePath {
    param(
        [string]$From,
        [string]$To
    )
    
    # Ensure From is treated as a directory
    if (-not $From.EndsWith('\')) {
        $From = $From + '\'
    }
    
    $fromUri = New-Object System.Uri($From)
    $toUri = New-Object System.Uri($To)
    
    $relativeUri = $fromUri.MakeRelativeUri($toUri)
    return [System.Uri]::UnescapeDataString($relativeUri.ToString()).Replace('/', '\')
}
function Add-FoldersToSolution {
    param(
        [string]$SolutionFile,
        [string]$ParentDir
    )
    
    # Read solution file
    $solutionContent = Get-Content $SolutionFile -Raw
    $solutionDir = Split-Path $SolutionFile -Parent
    
    # Solution folder GUID type
    $solutionFolderGuid = "2150E333-8FDC-42A3-9474-1A3956D46DE8"
    
    # Track folders and their GUIDs
    $folderGuids = @{}
    $newProjects = @()
    $newNesting = @()
    
    # Get all items in parent directory (excluding the solution directory itself)
    $solutionDirName = Split-Path $solutionDir -Leaf
    
    # Get all folders
    $folders = Get-ChildItem -Path $ParentDir -Directory -Recurse | Where-Object { 
        $_.FullName -notlike "*\$solutionDirName\*"
    } | Sort-Object FullName
    
    # Get all files
    $files = Get-ChildItem -Path $ParentDir -File -Recurse | Where-Object { 
        $_.FullName -notlike "*\$solutionDirName\*"
    } | Sort-Object FullName
    
    # Process folders and create entries
    foreach ($folder in $folders) {
        $folderName = $folder.Name
        $folderGuid = "{$(New-Guid)}"
        
        $folderGuids[$folder.FullName] = @{
            Guid = $folderGuid
            Name = $folderName
        }
        
        Write-Host "Processing folder: $folderName" -ForegroundColor Green
    }
    
    # Build project entries for each folder with its files
    foreach ($folderPath in ($folderGuids.Keys | Sort-Object)) {
        $folderInfo = $folderGuids[$folderPath]
        $folderName = $folderInfo.Name
        $folderGuid = $folderInfo.Guid
        
        # Start project entry
        $projectEntry = "Project(`"{$solutionFolderGuid}`") = `"$folderName`", `"$folderName`", `"$folderGuid`""
        
        # Find files in this specific folder (not subfolders)
        $folderFiles = $files | Where-Object { $_.Directory.FullName -eq $folderPath }
        
        if ($folderFiles.Count -gt 0) {
            $projectEntry += "`r`n`tProjectSection(SolutionItems) = preProject"
            
            foreach ($file in $folderFiles) {
                # Get relative path from solution directory to file
                $relativeFilePath = Get-RelativePath -From $solutionDir -To $file.FullName
                $projectEntry += "`r`n`t`t$relativeFilePath = $relativeFilePath"
                Write-Host "  Added file: $relativeFilePath" -ForegroundColor Cyan
            }
            
            $projectEntry += "`r`n`tEndProjectSection"
        }
        
        $projectEntry += "`r`nEndProject"
        $newProjects += $projectEntry
    }
    
    # Handle nesting (parent-child relationships)
    foreach ($folderPath in $folderGuids.Keys) {
        $parentPath = Split-Path $folderPath -Parent
        
        if ($folderGuids.ContainsKey($parentPath)) {
            $childGuid = $folderGuids[$folderPath].Guid
            $parentGuid = $folderGuids[$parentPath].Guid
            $newNesting += "`t`t$childGuid = $parentGuid"
        }
    }
    
    # Insert new projects into solution
    if ($newProjects.Count -gt 0) {
        # Find the last Project entry
        $lastProjectIndex = $solutionContent.LastIndexOf("EndProject")
        
        if ($lastProjectIndex -ge 0) {
            $insertPosition = $lastProjectIndex + "EndProject".Length
            $newProjectsText = "`r`n" + ($newProjects -join "`r`n")
            $solutionContent = $solutionContent.Insert($insertPosition, $newProjectsText)
        }
    }
    
    # Add nesting to GlobalSection(NestedProjects)
    if ($newNesting.Count -gt 0) {
        $nestedSection = "GlobalSection(NestedProjects) = preSolution"
        
        if ($solutionContent -match $nestedSection) {
            # Append to existing section
            $pattern = "(GlobalSection\(NestedProjects\) = preSolution\r?\n)"
            $replacement = "`$1$($newNesting -join "`r`n")`r`n"
            $solutionContent = $solutionContent -replace $pattern, $replacement
        } else {
            # Create new section before EndGlobal
            $endGlobalIndex = $solutionContent.LastIndexOf("EndGlobal")
            if ($endGlobalIndex -ge 0) {
                $insertText = "`t$nestedSection`r`n$($newNesting -join "`r`n")`r`n`tEndGlobalSection`r`n"
                $solutionContent = $solutionContent.Insert($endGlobalIndex, $insertText)
            }
        }
    }
    
    # Write back to solution file
    $solutionContent | Set-Content $SolutionFile -NoNewline
    
    Write-Host "`nSuccessfully updated solution file!" -ForegroundColor Green
    Write-Host "Added $($folders.Count) folders and $($files.Count) files" -ForegroundColor Green
}
# Main execution
try {
    $slnFile = Get-SolutionFile -Path $SolutionPath
    Write-Host "Using solution file: $slnFile" -ForegroundColor Yellow
    
    $slnDir = Split-Path $slnFile -Parent
    $parentDir = Split-Path $slnDir -Parent
    
    Write-Host "Scanning parent directory: $parentDir" -ForegroundColor Yellow
    Write-Host ""
    
    Add-FoldersToSolution -SolutionFile $slnFile -ParentDir $parentDir
    
    Write-Host "`nDone! Reload the solution in Visual Studio to see the changes." -ForegroundColor Green
}
catch {
    Write-Error "An error occurred: $_"
    Write-Error $_.ScriptStackTrace
    exit 1
}