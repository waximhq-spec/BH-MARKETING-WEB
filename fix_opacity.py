import re

path = '/home/wxm/BH-MARKETING-WEB/components/ProcessSection.tsx'
with open(path, 'r') as f:
    content = f.read()

# Replace any opacity animation with 1 to completely disable fades
content = re.sub(r'opacity:\s*0(?:\.7)?', 'opacity: 1', content)

with open(path, 'w') as f:
    f.write(content)

print("ProcessSection fixed")
