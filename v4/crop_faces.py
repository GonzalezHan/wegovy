import os
from PIL import Image

image_files = ['gerrard.png', 'woody.png', 'mark.png', 'gonzalez.png', 'terius.png']
public_dir = 'public'

for img_name in image_files:
    img_path = os.path.join(public_dir, img_name)
    if not os.path.exists(img_path):
        continue
    
    img = Image.open(img_path)
    width, height = img.size
    
    # Assuming typical portrait photo where face is in the upper middle
    # We want a square crop centered on the face.
    # Let's say face center is at roughly width/2, height*0.35
    # The crop size should be around width*0.5 to fit just the face
    
    crop_size = int(width * 0.7)
    if crop_size > height * 0.7:
        crop_size = int(height * 0.7)
        
    center_x = width // 2
    center_y = int(height * 0.4) # Slightly above center
    
    left = center_x - crop_size // 2
    top = center_y - crop_size // 2
    right = center_x + crop_size // 2
    bottom = center_y + crop_size // 2
    
    # Adjust if out of bounds
    if top < 0:
        bottom -= top
        top = 0
    if bottom > height:
        top -= (bottom - height)
        bottom = height
    if left < 0:
        right -= left
        left = 0
    if right > width:
        left -= (right - width)
        right = width
        
    cropped_img = img.crop((left, top, right, bottom))
    cropped_img.save(img_path)
    print(f"Cropped {img_name} successfully.")

