import os
import glob
from datetime import datetime

def create_file_header(filepath):
    """Create a pretty header for each file section"""
    filename = os.path.basename(filepath)
    relative_path = filepath.replace('\\', '/')
    
    header = f"\n\n{'='*80}\n"
    header += f"## 📄 {relative_path}\n"
    header += f"{'='*80}\n\n"
    header += f"```typescript\n"
    return header

def create_file_footer():
    """Create a footer for each file section"""
    return "```\n"

def process_directory(base_path):
    output = []
    
    # Add a nice header to the markdown file
    output.append("# Online Provider Implementations Archive")
    output.append(f"\nArchived on: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    output.append("\nThis file contains the archived implementations of various online task providers.")
    output.append("\n## Table of Contents")
    
    # First pass to create table of contents
    for provider in ['caldav', 'google', 'microsoft', 'ticktick']:
        provider_path = os.path.join(base_path, 'src', provider)
        if os.path.exists(provider_path):
            output.append(f"\n### {provider.title()} Provider")
            for filepath in glob.glob(os.path.join(provider_path, '**/*.*'), recursive=True):
                if os.path.isfile(filepath):
                    relative_path = filepath.replace(base_path, '').replace('\\', '/').lstrip('/')
                    output.append(f"- [{relative_path}](#{relative_path.replace('/', '-')})")

    output.append("\n\n## Implementations\n")

    # Second pass to add actual file contents
    for provider in ['caldav', 'google', 'microsoft', 'ticktick']:
        provider_path = os.path.join(base_path, 'src', provider)
        if os.path.exists(provider_path):
            output.append(f"\n### {provider.title()} Provider")
            for filepath in glob.glob(os.path.join(provider_path, '**/*.*'), recursive=True):
                if os.path.isfile(filepath):
                    with open(filepath, 'r', encoding='utf-8') as f:
                        content = f.read()
                        output.append(create_file_header(filepath))
                        output.append(content.rstrip())
                        output.append(create_file_footer())

    return '\n'.join(output)

def main():
    # Get the workspace root path
    workspace_path = os.getcwd()
    
    # Generate the markdown content
    content = process_directory(workspace_path)
    
    # Write to rememberOnline.md
    with open('rememberOnline.md', 'w', encoding='utf-8') as f:
        f.write(content)

if __name__ == '__main__':
    main() 