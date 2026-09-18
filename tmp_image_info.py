from pathlib import Path
from PIL import Image

for path in sorted(Path('public/screenshots/workflow').glob('*.png')) + sorted(Path('public/screenshots/workflow').glob('*.jpg')):
    print(path.name, Image.open(path).size)
