#!/usr/bin/env python3
import subprocess
import os
from datetime import datetime
import sys
from typing import Dict, List, Tuple

def get_git_commits() -> List[Tuple[str, str]]:
    """Get list of commits with timestamps."""
    cmd = ['git', 'log', '--pretty=format:%H|%ct']
    result = subprocess.run(cmd, capture_output=True, text=True)
    commits = []
    for line in result.stdout.splitlines():
        commit_hash, timestamp = line.split('|')
        commits.append((commit_hash, timestamp))
    return commits

def count_files_at_commit(commit_hash: str) -> Tuple[int, int]:
    """Count .ts and .js files in page/ and lib/ at given commit."""
    # Checkout the commit
    subprocess.run(['git', 'checkout', commit_hash, '-q'])
    
    ts_count = 0
    js_count = 0
    
    # Count files in page/ and lib/
    for root_dir in ['page', 'lib']:
        if not os.path.exists(root_dir):
            continue
            
        for root, _, files in os.walk(root_dir):
            for file in files:
                if file.endswith('.ts'):
                    ts_count += 1
                elif file.endswith('.js'):
                    js_count += 1
    
    return ts_count, js_count

def create_bar(ts: int, js: int, width: int = 50) -> str:
    """Create a colored bar representation of ts vs js ratio."""
    total = ts + js
    if total == 0:
        return '|' + ' ' * width + '| (0 files)'
        
    ts_width = int((ts / total) * width)
    js_width = width - ts_width
    
    # Using ANSI colors: Blue for TS, Yellow for JS
    ts_bar = '\033[94m' + '█' * ts_width + '\033[0m'
    js_bar = '\033[93m' + '█' * js_width + '\033[0m'
    
    return f'|{ts_bar}{js_bar}| ({ts} TS, {js} JS)'

def main():
    original_branch = subprocess.run(['git', 'rev-parse', '--abbrev-ref', 'HEAD'], 
                                   capture_output=True, text=True).stdout.strip()
    
    try:
        commits = get_git_commits()
        print("\nTypeScript vs JavaScript files over time:")
        print("Blue = TypeScript, Yellow = JavaScript\n")
        
        for i, (commit_hash, timestamp) in enumerate(commits):
            # Only process every 5th commit to speed things up
            if i % 5 != 0 and i != len(commits) - 1:
                continue
                
            ts_count, js_count = count_files_at_commit(commit_hash)
            date = datetime.fromtimestamp(int(timestamp))
            date_str = date.strftime('%Y-%m-%d')
            
            bar = create_bar(ts_count, js_count)
            print(f'{date_str}: {bar}')
            
    finally:
        # Always return to original branch
        subprocess.run(['git', 'checkout', original_branch, '-q'])

if __name__ == '__main__':
    main() 