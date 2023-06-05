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

    touchingLeftOrRightEdge() {
        const ballLeftEdge = this.x - this.radius;
        const ballRightEdge = this.x + this.radius;

        if(ballLeftEdge <= 0 || ballRightEdge >= canvas.width) {
            return true;
        }
        return false;
    }

    touchingTopEdge() {
        const ballTopEdge = this.y - this.radius;

        if(ballTopEdge <= 0) {
            return true;
        }
        return false;
    }
    
    touchingPaddleTopOrBottomEdge() {
        const ballTopEdge = this.y - this.radius;
        const ballBottomEdge = this.y + this.radius;
        const ballLeftEdge = this.x - this.radius;
        const ballRightEdge = this.x + this.radius;
        const ballWidthMidPoint = this.x;

        const paddleTopEdge = paddle.y;
        const paddleBottomEdge = paddle.y + paddle.height;
        const paddleLeftEdge = paddle.x;
        const paddleRightEdge = paddle.x + paddle.width;
        const paddleHeightMidPoint = paddle.y + (paddle.height / 2);
        const paddleWidthMidPoint = paddle.x + (paddle.width / 2);

        const dist = paddleWidthMidPoint - ballWidthMidPoint;

        if(ballRightEdge >= paddleLeftEdge && ballLeftEdge <= paddleRightEdge) {
            if((ballBottomEdge >= paddleTopEdge && ballBottomEdge <= paddleHeightMidPoint) || (ballTopEdge <= paddleBottomEdge && ballTopEdge >= paddleHeightMidPoint)) {
                const angle = dist * 0.2;
                this.speedX = angle;
                return true;
            }
        }
        return false;
    }

    touchingPaddleLeftOrRightEdge() {
        const ballTopEdge = this.y - this.radius;
        const ballBottomEdge = this.y + this.radius;
        const ballLeftEdge = this.x - this.radius;
        const ballRightEdge = this.x + this.radius;

        const paddleTopEdge = paddle.y;
        const paddleBottomEdge = paddle.y + paddle.height;
        const paddleLeftEdge = paddle.x;
        const paddleRightEdge = paddle.x + paddle.width;
        const paddleWidthMidPoint = paddle.x + (paddle.width / 2);

        if(ballBottomEdge >= paddleTopEdge && ballTopEdge <= paddleBottomEdge) {
            if((ballRightEdge >= paddleLeftEdge && ballRightEdge <= paddleWidthMidPoint) || (ballLeftEdge <= paddleRightEdge && ballLeftEdge >= paddleWidthMidPoint)) {
                return true;
            }
        }
        return false;
    }

    touchingBrickTopOrBottomEdge() {
        for(const brick of bricks) {
            const ballTopEdge = this.y - this.radius;
            const ballBottomEdge = this.y + this.radius;
            const ballLeftEdge = this.x - this.radius;
            const ballRightEdge = this.x + this.radius;
            const ballWidthMidPoint = this.x;

            const brickTopEdge = brick.y;
            const brickBottomEdge = brick.y + brick.height;
            const brickLeftEdge = brick.x;
            const brickRightEdge = brick.x + brick.width;
            const brickHeightMidPoint = brick.y + (brick.height / 2);
            const brickWidthMidPoint = brick.x + (brick.width / 2);

            const dist = brickWidthMidPoint - ballWidthMidPoint;

            if(ballRightEdge >= brickLeftEdge && ballLeftEdge <= brickRightEdge) {
                if((ballBottomEdge >= brickTopEdge && ballBottomEdge <= brickHeightMidPoint) || (ballTopEdge <= brickBottomEdge && ballTopEdge >= brickHeightMidPoint)) {
                    bricks.splice(bricks.indexOf(brick), 1);
                    const angle = dist * 0.2;
                    this.speedX = angle;
                    return true;
                }
            }
        }
        return false;
    }

    touchingBrickLeftOrRightEdge() {
        for(const brick of bricks) {
            const ballTopEdge = this.y - this.radius;
            const ballBottomEdge = this.y + this.radius;
            const ballLeftEdge = this.x - this.radius;
            const ballRightEdge = this.x + this.radius;

            const brickTopEdge = brick.y;
            const brickBottomEdge = brick.y + brick.height;
            const brickLeftEdge = brick.x;
            const brickRightEdge = brick.x + brick.width;
            const brickWidthMidPoint = brick.x + (brick.width / 2);

            if(ballBottomEdge >= brickTopEdge && ballTopEdge <= brickBottomEdge) {
                if((ballRightEdge >= brickLeftEdge && ballRightEdge <= brickWidthMidPoint) || (ballLeftEdge <= brickRightEdge && ballLeftEdge >= brickWidthMidPoint)) {
                    bricks.splice(bricks.indexOf(brick), 1);
                    return true;
                }
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
