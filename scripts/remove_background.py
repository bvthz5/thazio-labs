from PIL import Image
import numpy as np
import sys
import os

def process_logo(input_path, output_path):
    print(f"Processing {input_path}...")
    if not os.path.exists(input_path):
        print(f"Error: {input_path} not found.")
        sys.exit(1)
        
    img = Image.open(input_path).convert("RGBA")
    data = np.array(img)
    
    r = data[:, :, 0].astype(np.float32)
    g = data[:, :, 1].astype(np.float32)
    b = data[:, :, 2].astype(np.float32)
    
    rgb_max = np.max(data[:, :, :3], axis=2).astype(np.float32)
    rgb_min = np.min(data[:, :, :3], axis=2).astype(np.float32)
    
    # Checkerboard detection:
    # 1. Very low color saturation (max-min difference is very small)
    # 2. Not too bright (to avoid catching pure white neural nodes if any)
    is_gray = (rgb_max - rgb_min) < 25
    is_dark = rgb_max < 160
    is_bg = is_gray & is_dark
    
    # Luma-based alpha extraction for glowing elements
    # Blue/Violet glow has strong max RGB values
    alpha_from_luma = np.clip(rgb_max * 1.5, 0, 255)
    
    # Final alpha: 0 for checkerboard, smooth alpha for glow
    final_a = np.where(is_bg, 0, alpha_from_luma)
    
    # Un-premultiply alpha to restore pure, vibrant colors without the gray/black tint
    safe_alpha = np.maximum(final_a, 1) / 255.0
    new_r = np.clip(r / safe_alpha, 0, 255)
    new_g = np.clip(g / safe_alpha, 0, 255)
    new_b = np.clip(b / safe_alpha, 0, 255)
    
    new_data = np.zeros_like(data)
    new_data[:, :, 0] = new_r
    new_data[:, :, 1] = new_g
    new_data[:, :, 2] = new_b
    new_data[:, :, 3] = final_a
    
    out_img = Image.fromarray(new_data)
    out_img.save(output_path)
    print(f"Saved perfectly extracted transparent logo to {output_path}")

if __name__ == "__main__":
    process_logo("public/images/logo.png", "public/images/logo_transparent.png")
