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
            this.y = 0 + this.radius;
            this.speedY = -this.speedY;
        }
        if(ballLeftEdge <= 0) {
            this.x = 0 + this.radius;
            this.speedX = -this.speedX;
        }
        if(ballRightEdge >= canvas.width) {
            this.x = canvas.width - this.radius;
            this.speedX = -this.speedX;
        }
    }
    
    checkObjectCollision(object) {
        const ballTopEdge = this.y - this.radius;
        const ballBottomEdge = this.y + this.radius;
        const ballLeftEdge = this.x - this.radius;
        const ballRightEdge = this.x + this.radius;
        const ballWidthMidPoint = this.x;
        
        const objectTopEdge = object.y;
        const objectBottomEdge = object.y + object.height;
        const objectLeftEdge = object.x;
        const objectRightEdge = object.x + object.width;
        const objectHeightMidPoint = object.y + (object.height / 2);
        const objectWidthMidPoint = object.x + (object.width / 2);
        
        const dist = ballWidthMidPoint - objectWidthMidPoint;
        
        // check Top and Bottom Edge of Object
        if(ballRightEdge >= objectLeftEdge && ballLeftEdge <= objectRightEdge) {
            if(ballBottomEdge >= objectTopEdge && ballBottomEdge <= objectHeightMidPoint) {
                const angle = (10 / 100) * dist; // 10% of object width from the mid point of object
                this.y = objectTopEdge - this.radius;
                this.speedX = angle;
                this.speedY = -this.speedY;
                return true;
            }
            if(ballTopEdge <= objectBottomEdge && ballTopEdge >= objectHeightMidPoint) {
                const angle = (10 / 100) * dist;
                this.y = objectBottomEdge + this.radius;
                this.speedX = angle;
                this.speedY = -this.speedY;
                return true;
            }
        }
        
        // check Left and Right Edge of Object
        if(ballBottomEdge >= objectTopEdge && ballTopEdge <= objectBottomEdge) {
            if(ballRightEdge >= objectLeftEdge && ballRightEdge <= objectWidthMidPoint) {
                this.x = objectLeftEdge - this.radius;
                this.speedX = -this.speedX;
                return true;
            }
            if(ballLeftEdge <= objectRightEdge && ballLeftEdge >= objectWidthMidPoint) {
                this.x = objectRightEdge + this.radius;
                this.speedX = -this.speedX;
                return true;
            }
        }
        
        return false;
    }

    outOfCanvas() {
        const ballTopEdge = this.y - this.radius;
    
        if(ballTopEdge >= canvas.height) {
            return true;
        }
        return false;
    }
}