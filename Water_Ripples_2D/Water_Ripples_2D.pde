PImage texture;
float damping = 0.97;
int framesPerRipple = 5;
float imageBrightness = 0.75;

float[][] buffer1;
float[][] buffer2;

void setup() {
    size(509, 339);

    buffer1 = new float[height][width];
    buffer2 = new float[height][width];

    // picture size - 509x339
    texture = loadImage("texture.jpg");
}

void mouseDragged() {
    buffer1[mouseY][mouseX] = 500;
}

void draw() {
    // random new ripple
    if (frameCount % framesPerRipple == 0) {
        int rippleX = int(random(0, width));
        int rippleY = int(random(0, height));
        buffer2[rippleY][rippleX] = random(100, 2000);
    }

    // update ripples
    for (int y = 1; y < height - 1; y++) {
        for (int x = 1; x < width - 1; x++) {
            buffer2[y][x] = (buffer1[y][x - 1] + buffer1[y][x + 1] + buffer1[y + 1][x] + buffer1[y - 1][x]) / 2 - buffer2[y][x];
            buffer2[y][x] *= damping;
        }
    }

    // draw
    loadPixels();
    texture.loadPixels();
    for (int y = 1; y < height - 1; y++) {
        for (int x = 1; x < width - 1; x++) {
            // refraction
            int Xoffset = int(buffer2[y][x - 1] - buffer2[y][x + 1]);
            int Yoffset = int(buffer2[y - 1][x] - buffer2[y + 1][x]);
            int textureX = x + int(Xoffset * 0.5);
            int textureY = y + int(Yoffset * 0.5);
            int imgIndex = x + y * width;

            // constrain max refraction to canvas frame
            if (textureX >= width) {
                textureX = width - 1;
            } else if (textureX < 0) {
                textureX = 0;
            }
            if (textureY >= height) {
                textureY = height - 1;
            } else if (textureY < 0) {
                textureY = 0;
            }

            color texturePixel = texture.pixels[textureX + textureY * width];
            color bufferPixel = color(buffer2[y][x]);
            int shading = int(Xoffset * 0.005);

            // constrain max colour to white
            float r = constrain(red(texturePixel) * imageBrightness + red(shading), 0, 255);
            float g = constrain(green(texturePixel) * imageBrightness + green(shading), 0, 255);
            float b = constrain(blue(texturePixel) * imageBrightness + blue(shading), 0, 255);           

            // draw pixel colour
            pixels[imgIndex] = color(r,g,b);

        }
    }
    updatePixels();

    // swap buffers
    float[][] tempBuffer = buffer2;
    buffer2 = buffer1;
    buffer1 = tempBuffer;
}