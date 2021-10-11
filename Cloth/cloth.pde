float clothPixelSize = 300;
int clothSize = 8;
float desiredSpacing;
boolean drawCloth = false;
float gravity = 3;

Particle[] particles;
Stick[] sticks;

void setup() {
    size(800, 800);
    
    float spacing = clothPixelSize / (clothSize - 1);
    desiredSpacing = spacing;
    float startXY = (width - clothPixelSize) / 2;
    
    particles = new Particle[clothSize * clothSize];
    for (int y = 0; y < clothSize; y++) {
        for (int x = 0; x < clothSize; x++) {
            particles[y * clothSize + x] = new Particle(startXY + spacing * x, startXY + spacing * y, y == 0);
        }
    }
    
    sticks = new Stick[2 * clothSize * (clothSize - 1)];
    int stickIndex = 0;
    for (int y = 0; y < clothSize; y++) {
        for (int x = 0; x < clothSize; x++) {
            int clothIndex = y * clothSize + x;
            
            // horizontal
            if (x < clothSize - 1) {
                sticks[stickIndex] = new Stick(particles[clothIndex], particles[clothIndex + 1]);
                stickIndex++;
            }
            
            // vertical
            if (y < clothSize - 1) {
                sticks[stickIndex] = new Stick(particles[clothIndex], particles[clothIndex + clothSize]);
                stickIndex++;
            }
        }
    }
}

void draw() {
    // ----------------------LOGIC----------------------
    for (Stick s : sticks) {
        float distance = getDist(s.p1_, s.p2_);
        float diff = distance - desiredSpacing;
        float moveRatio = diff / (2 * distance);
        float dx = s.p1_.pos_.x - s.p2_.pos_.x;
        float dy = s.p1_.pos_.y - s.p2_.pos_.y;
        
        if (!s.p1_.fixed_) {
            s.p1_.vel_.x -= dx * moveRatio * 0.85;
            s.p1_.vel_.y -= dy * moveRatio * 0.85;
        }
        if (!s.p2_.fixed_) {
            s.p2_.vel_.x += dx * moveRatio * 0.85;
            s.p2_.vel_.y += dy * moveRatio * 0.85;
        }
    }
    
    for (Particle p : particles) {
        p.update();
    }
    
    // ----------------------DRAW----------------------
    background(0);
    for (Stick s : sticks) {
        s.draw();
    }
    
    if (drawCloth) {
        fill(255);
        stroke(255,0,0,100);
        noStroke();
        beginShape();
        for (int x = 0; x < clothSize; x++) {
            vertex(particles[x].pos_.x, particles[x].pos_.y);
        }
        
        for (int y = 0; y < clothSize; y++) {
            vertex(particles[y * clothSize + clothSize - 1].pos_.x, particles[y * clothSize + clothSize - 1].pos_.y);
        }
        
        for (int x = clothSize - 1; x > - 1; x--) {
            vertex(particles[(clothSize - 1) * clothSize + x].pos_.x, particles[(clothSize - 1) * clothSize + x].pos_.y);
        }
        
        for (int y = clothSize - 1; y > - 1; y--) {
            vertex(particles[y * clothSize].pos_.x, particles[y * clothSize].pos_.y);
        }
        endShape();
    }   
}

void mouseDragged() {
    float offsetX = mouseX - particles[ceil(clothSize / 2)].pos_.x;
    for (int i = 0; i < clothSize; i++) {
        particles[i].pos_.y = mouseY;
        particles[i].pos_.x += offsetX;
    }
    
}

float getDist(Particle a, Particle b) {
    float dx = a.pos_.x - b.pos_.x;
    float dy = a.pos_.y - b.pos_.y;
    return pow(dx * dx + dy * dy, 0.5);
}