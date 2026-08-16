import numpy as np
from PIL import Image, ImageFilter
from collections import deque

def remove_white_bg(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    arr = np.array(img)
    h, w = arr.shape[:2]
    
    # Calculate difference from white (255, 255, 255)
    r, g, b, a = arr[:,:,0], arr[:,:,1], arr[:,:,2], arr[:,:,3]
    
    # Is pixel near white/light grey studio background?
    # Studio background is very light (all channels > 240, and color difference small)
    is_light = (r > 235) & (g > 235) & (b > 235) & (np.abs(r.astype(int) - g.astype(int)) < 15) & (np.abs(g.astype(int) - b.astype(int)) < 15)
    
    # Flood fill from boundaries (only connected background, so internal white stickers like Qualcomm/Tritons are preserved!)
    bg_mask = np.zeros((h, w), dtype=bool)
    visited = np.zeros((h, w), dtype=bool)
    
    queue = deque()
    
    # Add borders
    for x in range(w):
        if is_light[0, x]: queue.append((0, x)); visited[0, x] = True; bg_mask[0, x] = True
        if is_light[h-1, x]: queue.append((h-1, x)); visited[h-1, x] = True; bg_mask[h-1, x] = True
    for y in range(h):
        if is_light[y, 0]: queue.append((y, 0)); visited[y, 0] = True; bg_mask[y, 0] = True
        if is_light[y, w-1]: queue.append((y, w-1)); visited[y, w-1] = True; bg_mask[y, w-1] = True
        
    while queue:
        cy, cx = queue.popleft()
        for dy, dx in [(-1,0), (1,0), (0,-1), (0,1)]:
            ny, nx = cy + dy, cx + dx
            if 0 <= ny < h and 0 <= nx < w and not visited[ny, nx]:
                visited[ny, nx] = True
                if is_light[ny, nx]:
                    bg_mask[ny, nx] = True
                    queue.append((ny, nx))
                    
    # Also handle the soft floor shadow under the robot (subtle gradient to transparency)
    # The alpha mask: 0 where bg_mask is True, 255 where False
    alpha = np.where(bg_mask, 0, 255).astype(np.uint8)
    
    # Create PIL alpha channel and smooth slightly for crisp anti-aliasing
    alpha_img = Image.fromarray(alpha, mode='L')
    alpha_img = alpha_img.filter(ImageFilter.GaussianBlur(radius=0.7))
    
    arr[:, :, 3] = np.array(alpha_img)
    result = Image.fromarray(arr, mode='RGBA')
    
    # Crop to bounding box
    bbox = result.getbbox()
    if bbox:
        m = 12
        crop_box = (max(0, bbox[0]-m), max(0, bbox[1]-m), min(w, bbox[2]+m), min(h, bbox[3]+m))
        result = result.crop(crop_box)
        
    result.save(output_path, "PNG", optimize=True)
    print(f"Generated transparent cutout: {output_path} ({result.size})")

if __name__ == "__main__":
    remove_white_bg("src/assets/photos/big-jiawei-hero.jpg", "src/assets/photos/big-jiawei-transparent.png")
