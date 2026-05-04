import sys

with open('app/page.tsx', 'r') as f:
    lines = f.readlines()

# Delete lines 704 to 717 (indices 703 to 716)
del lines[703:717]

with open('app/page.tsx', 'w') as f:
    f.writelines(lines)

print("File updated successfully.")
