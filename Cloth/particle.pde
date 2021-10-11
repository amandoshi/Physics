class Particle {
    PVector pos_;
    PVector prevPos_;
    PVector vel_;
    PVector force_;
    boolean fixed_;
    
    Particle(float x, float y, boolean fixed) {
        pos_ = new PVector(x, y);
        prevPos_ = pos_.copy();
        vel_ = new PVector();
        force_ = new PVector();
        fixed_ = fixed;
    }
    
    void draw() {
        noStroke();
        fill(255);
        ellipse(pos_.x, pos_.y, 10, 10);
    }
    
    void update() {
        if (fixed_) {
            return;
        }
        
        vel_.add(0, gravity);
        vel_.mult(0.95);
        pos_.add(vel_);
    }
}
