from PIL import Image

img = Image.open('public/members.png')
w, h = img.size
w_part = w / 5

for i in range(5):
    left = int(i * w_part)
    right = int((i + 1) * w_part)
    top = 0
    bottom = int(w_part)
    if bottom > h:
        bottom = h
    box = (left, top, right, bottom)
    cropped = img.crop(box)
    cropped.save(f'public/member_{i+1}.png')
print("Cropping complete.")
