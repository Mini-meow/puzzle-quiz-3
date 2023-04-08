from PIL import Image

crop_height = 7
crop_width = 4

img = Image.open("src/test11.jpg")
width, height = img.size
block_size, crop_size = (width, crop_width) if width / height <= crop_width / crop_height else (height, crop_height)
piece_size = block_size // crop_size

left = (width - piece_size * crop_width) // 2
upper = (height - piece_size * crop_height) // 2
right = (width + piece_size * crop_width) // 2
lower = (height + piece_size * crop_height) // 2

img = img.crop((left, upper, right, lower))

for i in range(0, crop_height):
    for j in range(0, crop_width):
        block = img.crop((j * piece_size, i * piece_size, j * piece_size + piece_size, i * piece_size + piece_size))
        block.save(f"src/puzzle/{i}_{j}.png")