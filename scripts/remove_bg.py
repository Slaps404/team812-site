import sys
from PIL import Image
from rembg import remove

def process_robot_image(input_path, output_path):
    print(f"Reading {input_path}...")
    inp = Image.open(input_path)
    print(f"Removing background (original size: {inp.size})...")
    output = remove(inp)
    
    # Optional: trim empty transparent borders so it fits tightly
    bbox = output.getbbox()
    if bbox:
        # Give a small 10px margin
        margin = 10
        left = max(0, bbox[0] - margin)
        top = max(0, bbox[1] - margin)
        right = min(output.width, bbox[2] + margin)
        bottom = min(output.height, bbox[3] + margin)
        output = output.crop((left, top, right, bottom))
    
    output.save(output_path, "PNG", optimize=True)
    print(f"Saved transparent cutout to {output_path} (new size: {output.size})")

if __name__ == "__main__":
    in_file = "src/assets/photos/big-jiawei-hero.jpg"
    out_file = "src/assets/photos/big-jiawei-transparent.png"
    process_robot_image(in_file, out_file)
