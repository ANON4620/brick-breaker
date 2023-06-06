class Ball {
    constructor(x, y, radius, startAngle, endAngle, speedX, speedY, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.startAngle = startAngle;
        this.endAngle = endAngle;
        this.speedX = speedX;
        this.speedY = speedY;
        this.color = color;

        this.draw();
    }

    draw() {
        const x = this.x;
        const y = this.y;
        const radius = this.radius;
        const startAngle = this.startAngle;
        const endAngle = this.endAngle;
        const color = this.color;

        ctx.beginPath();
        ctx.arc(x, y, radius, startAngle, endAngle);
        ctx.fillStyle = color;
        ctx.fill();
    }

    move() {
        this.x += this.speedX;
        this.y += this.speedY;
    }
    
    checkEdgeCollision() {
        const ballTopEdge = this.y - this.radius;
        const ballLeftEdge = this.x - this.radius;
        const ballRightEdge = this.x + this.radius;
    
        if(ballTopEdge <= 0) {
            this.speedY = -this.speedY;
        }
        if(ballLeftEdge <= 0 || ballRightEdge >= canvas.width) {
            this.speedX = -this.speedX;
        }
    }

    outOfCanvas() {
        const ballTopEdge = this.y - this.radius;

        if(ballTopEdge >= canvas.height) {
            return true;
        }
        return false;
    }
}
