# Add Parent Folders to Solution

Automatically add folders and files from the parent directory to your .NET solution as solution folders, without copying files.

## What It Does

This script scans the parent directory of your `.sln` file and adds all folders and files as solution folders/items in Visual Studio. Files are **linked** (not copied), maintaining the original directory structure.

### Example

**Before:**
```
ParentFolder/
├── docs/
│   └── architecture.md
├── diagrams/
│   └── flow.mmd
└── MySolution/
    ├── MySolution.sln
    └── MyProject/
        └── MyProject.csproj
```

**After (in Visual Studio):**
```
📁 Solution 'MySolution'
  📁 docs
    📄 architecture.md
  📁 diagrams
    📄 flow.mmd
  📁 MyProject
```

## Usage

### Windows (PowerShell)

```powershell
# Navigate to your solution directory
cd MySolution

# Run the script
.\Add-ParentFoldersToSolution.ps1

# Or specify the solution path
.\Add-ParentFoldersToSolution.ps1 -SolutionPath ".\MySolution.sln"
```

### Linux / macOS / Git Bash

```bash
# Make the script executable (first time only)
chmod +x add-parent-folders-to-solution.sh

# Navigate to your solution directory
cd MySolution

# Run the script
./add-parent-folders-to-solution.sh

# Or specify the solution path
./add-parent-folders-to-solution.sh ./MySolution.sln
```

## Features

✅ Recursively scans parent directory  
✅ Creates solution folders matching the directory structure  
✅ Links files without copying them  
✅ Handles nested folders automatically  
✅ Excludes the solution directory itself  
✅ Auto-detects `.sln` file if not specified  

## Requirements

**PowerShell:**
- Windows PowerShell 5.1+ or PowerShell Core 7+

**Bash:**
- Bash shell (Linux/macOS/Git Bash/WSL)
- `uuidgen` (usually pre-installed)

## Notes

- Files are **linked**, not copied. Changes in Visual Studio update the original files.
- Reload your solution in Visual Studio after running the script to see the changes.
- The script skips the solution directory itself to avoid circular references.
- Works with any file type (`.md`, `.mmd`, `.json`, `.txt`, etc.)

## Troubleshooting

**"No .sln file found"**  
Make sure you're running the script from the solution directory, or specify the path explicitly.

**"Permission denied" (Bash)**  
Run `chmod +x add-parent-folders-to-solution.sh` to make the script executable.

**Changes not visible in Visual Studio**  
Close and reopen the solution file to refresh the Solution Explorer.

---

## Adding Files as Links to Projects (If required)

If you prefer to add files as links directly to a .csproj file instead of solution folders, you can do so through Visual Studio's GUI or by manually editing the project file.

### Option 1: Using Visual Studio GUI

1. **Right-click on the project** (or folder within the project) in Solution Explorer
2. **Select** `Add` → `Existing Item...`
3. **Navigate** to the file you want to add (outside the project directory)
4. **Click the dropdown arrow** next to the "Add" button
5. **Select** `Add As Link`

The file will now appear in your project with a link icon (↗️) indicating it's linked, not copied.

**To add multiple files:**
- Hold `Ctrl` or `Shift` to select multiple files before clicking "Add As Link"

**To organize linked files in folders:**
- Create a folder in Solution Explorer first (right-click project → `Add` → `New Folder`)
- Right-click the folder and add files as links

### Option 2: Manually Editing the XML Project File

### Steps

1. **Open the `.csproj` file** in a text editor
2. **Add an `<ItemGroup>`** section with linked files:

```xml
<ItemGroup>
  <None Include="..\docs\architecture.md" Link="docs\architecture.md" />
  <None Include="..\diagrams\flow.mmd" Link="diagrams\flow.mmd" />
  <None Include="..\README.md" Link="README.md" />
</ItemGroup>
```

3. **Save the file** and reload the project in Visual Studio

### Explanation

- `Include="..\path\to\file"` - The actual file location (relative to `.csproj`)
- `Link="virtual\path"` - How it appears in Solution Explorer
- `<None>` - Item type for non-compiled files (use `<Content>` for web projects)

### Example

**File structure:**
```
ParentFolder/
├── docs/
│   └── architecture.md
└── MyProject/
    └── MyProject.csproj
```

**In `MyProject.csproj`:**
```xml
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <TargetFramework>net8.0</TargetFramework>
  </PropertyGroup>
  
  <ItemGroup>
    <None Include="..\docs\architecture.md" Link="docs\architecture.md" />
  </ItemGroup>
</Project>
```

**Result in Solution Explorer:**
```
📁 MyProject
  📁 docs
    📄 architecture.md
```

> **Note:** The automated scripts add files to **solution folders** (visible at solution level), while this manual method adds files to **project folders** (visible within a specific project). 