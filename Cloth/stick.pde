class Stick {
    Particle p1_;
    Particle p2_;
    
    Stick(Particle p1, Particle p2) {
        p1_ = p1;
        p2_ = p2;
    }
    
    void draw() {
        stroke(255);
        line(p1_.pos_.x, p1_.pos_.y, p2_.pos_.x, p2_.pos_.y);
    }
}