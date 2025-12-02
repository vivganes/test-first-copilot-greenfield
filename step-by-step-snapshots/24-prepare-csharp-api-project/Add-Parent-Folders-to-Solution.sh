#!/bin/bash
#
# add-parent-folders-to-solution.sh
#
# Adds folders and files from the parent directory to a .NET solution as solution folders.
# Maintains the directory structure without copying files.
#
# Usage:
#   ./add-parent-folders-to-solution.sh [solution-path]
#
# Example:
#   ./add-parent-folders-to-solution.sh
#   ./add-parent-folders-to-solution.sh ./MySolution/MySolution.sln
#
set -e
# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color
# Solution folder GUID type
SOLUTION_FOLDER_GUID="2150E333-8FDC-42A3-9474-1A3956D46DE8"
# Generate a new GUID
generate_guid() {
    if command -v uuidgen &> /dev/null; then
        uuidgen | tr '[:lower:]' '[:upper:]'
    elif [ -f /proc/sys/kernel/random/uuid ]; then
        cat /proc/sys/kernel/random/uuid | tr '[:lower:]' '[:upper:]'
    else
        # Fallback for Windows Git Bash - use PowerShell
        powershell.exe -Command "[guid]::NewGuid().ToString().ToUpper()" 2>/dev/null | tr -d '\r'
    fi
}
# Get relative path from one directory to another (Windows-style backslashes)
get_relative_path() {
    local from="$1"
    local to="$2"
    
    # Convert to Windows paths if on Git Bash
    if [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "win32" ]]; then
        # Use cygpath if available (Git Bash)
        if command -v cygpath &> /dev/null; then
            from=$(cygpath -w "$from")
            to=$(cygpath -w "$to")
        fi
    fi
    
    # Use realpath if available
    if command -v realpath &> /dev/null; then
        local rel_path=$(realpath --relative-to="$from" "$to" 2>/dev/null || echo "")
        if [ -n "$rel_path" ]; then
            echo "$rel_path" | sed 's/\//\\/g'
            return
        fi
    fi
    
    # Fallback to Python
    if command -v python3 &> /dev/null; then
        python3 -c "import os.path; print(os.path.relpath('$to', '$from').replace('/', '\\\\'))"
    elif command -v python &> /dev/null; then
        python -c "import os.path; print(os.path.relpath('$to', '$from').replace('/', '\\\\'))"
    else
        # Last resort - manual calculation
        echo "..\\$(basename "$to")"
    fi
}
# Find solution file
find_solution_file() {
    local sln_path="$1"
    
    if [ -n "$sln_path" ]; then
        if [ -f "$sln_path" ]; then
            realpath "$sln_path" 2>/dev/null || echo "$(cd "$(dirname "$sln_path")"; pwd)/$(basename "$sln_path")"
            return 0
        else
            echo -e "${RED}Error: Solution file not found: $sln_path${NC}" >&2
            exit 1
        fi
    fi
    
    # Search for .sln files in current directory
    local sln_files=(*.sln)
    
    if [ ! -e "${sln_files[0]}" ]; then
        echo -e "${RED}Error: No .sln file found in current directory${NC}" >&2
        exit 1
    fi
    
    if [ ${#sln_files[@]} -gt 1 ]; then
        echo "Multiple .sln files found. Please select one:"
        for i in "${!sln_files[@]}"; do
            echo "[$i] ${sln_files[$i]}"
        done
        read -p "Enter selection: " selection
        realpath "${sln_files[$selection]}" 2>/dev/null || echo "$(pwd)/${sln_files[$selection]}"
    else
        realpath "${sln_files[0]}" 2>/dev/null || echo "$(pwd)/${sln_files[0]}"
    fi
}
# Main function to add folders to solution
add_folders_to_solution() {
    local sln_file="$1"
    local parent_dir="$2"
    
    echo -e "${YELLOW}Using solution file: $sln_file${NC}"
    echo -e "${YELLOW}Scanning parent directory: $parent_dir${NC}"
    echo ""
    
    local sln_dir=$(dirname "$sln_file")
    local sln_dir_name=$(basename "$sln_dir")
    
    # Create temporary files
    local temp_sln=$(mktemp)
    local temp_projects=$(mktemp)
    local temp_nesting=$(mktemp)
    
    # Copy original solution
    cp "$sln_file" "$temp_sln"
    
    # Find all folders in parent directory (excluding solution directory)
    declare -a folders
    while IFS= read -r -d '' folder; do
        if [[ "$folder" != *"/$sln_dir_name"* ]] && [[ "$folder" != "$parent_dir" ]]; then
            folders+=("$folder")
        fi
    done < <(find "$parent_dir" -mindepth 1 -type d -print0 | sort -z)
    
    # Find all files in parent directory (excluding solution directory)
    declare -a files
    while IFS= read -r -d '' file; do
        if [[ "$file" != *"/$sln_dir_name/"* ]]; then
            files+=("$file")
        fi
    done < <(find "$parent_dir" -mindepth 1 -type f -print0 | sort -z)
    
    # Process folders and generate GUIDs
    declare -A folder_guids
    declare -A folder_names
    
    for folder in "${folders[@]}"; do
        local folder_name=$(basename "$folder")
        local folder_guid="{$(generate_guid)}"
        
        folder_guids["$folder"]="$folder_guid"
        folder_names["$folder"]="$folder_name"
        
        echo -e "${GREEN}Processing folder: $folder_name${NC}"
    done
    
    # Build project entries for each folder with its files
    for folder in "${folders[@]}"; do
        local folder_name="${folder_names[$folder]}"
        local folder_guid="${folder_guids[$folder]}"
        
        # Start project entry
        echo "Project(\"{$SOLUTION_FOLDER_GUID}\") = \"$folder_name\", \"$folder_name\", \"$folder_guid\"" >> "$temp_projects"
        
        # Find files in this specific folder (not subfolders)
        local has_files=false
        
        for file in "${files[@]}"; do
            local file_dir=$(dirname "$file")
            
            if [ "$file_dir" == "$folder" ]; then
                if [ "$has_files" == "false" ]; then
                    echo "	ProjectSection(SolutionItems) = preProject" >> "$temp_projects"
                    has_files=true
                fi
                
                # Get relative path from solution directory to file
                local relative_file=$(get_relative_path "$sln_dir" "$file")
                echo "		$relative_file = $relative_file" >> "$temp_projects"
                
                echo -e "${CYAN}  Added file: $relative_file${NC}"
            fi
        done
        
        # Close ProjectSection if files were added
        if [ "$has_files" == "true" ]; then
            echo "	EndProjectSection" >> "$temp_projects"
        fi
        
        echo "EndProject" >> "$temp_projects"
    done
    
    # Handle nesting (parent-child relationships)
    for folder in "${folders[@]}"; do
        local parent_folder=$(dirname "$folder")
        
        if [ "$parent_folder" != "$parent_dir" ] && [ -n "${folder_guids[$parent_folder]}" ]; then
            local child_guid="${folder_guids[$folder]}"
            local parent_guid="${folder_guids[$parent_folder]}"
            echo "		$child_guid = $parent_guid" >> "$temp_nesting"
        fi
    done
    
    # Insert new projects into solution
    if [ -s "$temp_projects" ]; then
        # Find last EndProject line
        local last_endproject=$(grep -n "^EndProject" "$temp_sln" | tail -1 | cut -d: -f1)
        
        if [ -n "$last_endproject" ]; then
            {
                head -n "$last_endproject" "$temp_sln"
                cat "$temp_projects"
                tail -n +$((last_endproject + 1)) "$temp_sln"
            } > "${temp_sln}.new"
            mv "${temp_sln}.new" "$temp_sln"
        fi
    fi
    
    # Add nesting to GlobalSection(NestedProjects)
    if [ -s "$temp_nesting" ]; then
        if grep -q "GlobalSection(NestedProjects)" "$temp_sln"; then
            # Append to existing section
            local section_line=$(grep -n "GlobalSection(NestedProjects)" "$temp_sln" | cut -d: -f1)
            {
                head -n "$section_line" "$temp_sln"
                cat "$temp_nesting"
                tail -n +$((section_line + 1)) "$temp_sln"
            } > "${temp_sln}.new"
            mv "${temp_sln}.new" "$temp_sln"
        else
            # Create new section before EndGlobal
            local endglobal_line=$(grep -n "^EndGlobal" "$temp_sln" | cut -d: -f1)
            if [ -n "$endglobal_line" ]; then
                {
                    head -n $((endglobal_line - 1)) "$temp_sln"
                    echo "	GlobalSection(NestedProjects) = preSolution"
                    cat "$temp_nesting"
                    echo "	EndGlobalSection"
                    tail -n +$endglobal_line "$temp_sln"
                } > "${temp_sln}.new"
                mv "${temp_sln}.new" "$temp_sln"
            fi
        fi
    fi
    
    # Write back to solution file
    cp "$temp_sln" "$sln_file"
    
    # Cleanup
    rm -f "$temp_sln" "$temp_projects" "$temp_nesting" "${temp_sln}.new"
    
    echo ""
    echo -e "${GREEN}Successfully updated solution file!${NC}"
    echo -e "${GREEN}Added ${#folders[@]} folders and ${#files[@]} files${NC}"
    echo ""
    echo -e "${GREEN}Done! Reload the solution in Visual Studio to see the changes.${NC}"
}
# Main execution
main() {
    local sln_path="$1"
    
    local sln_file=$(find_solution_file "$sln_path")
    local sln_dir=$(dirname "$sln_file")
    local parent_dir=$(dirname "$sln_dir")
    
    add_folders_to_solution "$sln_file" "$parent_dir"
}
# Run main function
main "$@"