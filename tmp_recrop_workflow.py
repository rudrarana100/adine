from pathlib import Path
from PIL import Image

root = Path('public/screenshots/workflow')
boxes = {
    'follow-ups': (205, 105, 1350, 820),
    'sales-pipeline': (167, 135, 1370, 760),
    'tasks': (177, 185, 1430, 700),
    'calendar': (180, 118, 1450, 820),
}

for name, box in boxes.items():
    image = Image.open(root / f'{name}.png').convert('RGB')
    image.crop(box).save(root / f'{name}-clean.jpg', quality=88, optimize=True, progressive=True)
