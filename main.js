"use strict";

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Paddle Object
const paddleWidth = 70;
const paddleHeight = 12;
const paddleX = (canvas.width / 2) - (paddleWidth / 2);
const paddleY = canvas.height - (paddleHeight * 2);
const paddleColor = "red";
const paddle = new Paddle(paddleX, paddleY, paddleWidth, paddleHeight, paddleColor);

// Ball Object
const ballRadius = 10;
const ballX = paddleX + (paddleWidth / 2);
const ballY = paddleY - ballRadius - 1;
const ballStartAngle = 0 * Math.PI;
const ballEndAngle = 2 * Math.PI;
const ballSpeedX = 0;
const ballSpeedY = 5;
const ballColor = "blue";
const ball = new Ball(ballX, ballY, ballRadius, ballStartAngle, ballEndAngle, ballSpeedX, ballSpeedY, ballColor);

// Brick Objects
const row = 5;
const col = 10;
const brickWidth = (canvas.width / col) - 2;
const brickHeight = 16;
const brickColors = ["violet", "indigo", "blue", "green", "yellow", "orange", "red", "brown", "gold"];
const borderThickness = 2;
const borderColor = "black";
const bricks = [];
let brickX = (canvas.width / 2) - ((brickWidth * col) / 2);
let brickY = 2;
for(let i = 1; i <= row; i++) {
    const brickColor = brickColors[Math.floor(Math.random() * brickColors.length)];
    for(let j = 1; j <= col; j++) {
        bricks.push(new Brick(brickX, brickY, brickWidth, brickHeight, brickColor, borderThickness, borderColor));
        brickX += brickWidth;
    }
    brickX = (canvas.width / 2) - ((brickWidth * col) / 2);
    brickY += brickHeight;
}

let id;
function start() {
    canvas.addEventListener('mousemove', movePaddleWithMouse);
    canvas.addEventListener('touchmove', movePaddleWithTouch);
    id = requestAnimationFrame(update);
    console.log('Game Started.');
}
    
function stop() {
    canvas.removeEventListener('mousemove', movePaddleWithMouse);
    canvas.removeEventListener('touchmove', movePaddleWithTouch);
    cancelAnimationFrame(id);
    console.log('Game Stopped.');
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    paddle.draw();
    
    for(const brick of bricks) {
        brick.draw();
    }

    ball.move();
    ball.draw();
    ball.checkEdgeCollision();
    checkBallAndPaddleCollision();
    checkBallAndBrickCollision();
    if(ball.outOfCanvas()) {
        stop();
        return;
    }
    
    id = requestAnimationFrame(update);
}

function movePaddleWithMouse(e) {paddle.move(e.clientX)};
function movePaddleWithTouch(e) {paddle.move(e.touches[0].clientX)};

function checkBallAndPaddleCollision() {
    function checkPaddleTopOrBottomEdge() {
        const ballTopEdge = ball.y - ball.radius;
        const ballBottomEdge = ball.y + ball.radius;
        const ballLeftEdge = ball.x - ball.radius;
        const ballRightEdge = ball.x + ball.radius;
        const ballWidthMidPoint = ball.x;

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
                ball.speedX = angle;
                ball.speedY = -ball.speedY;
            }
        }
    }

    function checkPaddleLeftOrRightEdge() {
        const ballTopEdge = ball.y - ball.radius;
        const ballBottomEdge = ball.y + ball.radius;
        const ballLeftEdge = ball.x - ball.radius;
        const ballRightEdge = ball.x + ball.radius;

        const paddleTopEdge = paddle.y;
        const paddleBottomEdge = paddle.y + paddle.height;
        const paddleLeftEdge = paddle.x;
        const paddleRightEdge = paddle.x + paddle.width;
        const paddleWidthMidPoint = paddle.x + (paddle.width / 2);

        if(ballBottomEdge >= paddleTopEdge && ballTopEdge <= paddleBottomEdge) {
            if((ballRightEdge >= paddleLeftEdge && ballRightEdge <= paddleWidthMidPoint) || (ballLeftEdge <= paddleRightEdge && ballLeftEdge >= paddleWidthMidPoint)) {
                ball.speedX = -ball.speedX;
            }
        }
    }

    checkPaddleTopOrBottomEdge();
    checkPaddleLeftOrRightEdge();
}

function checkBallAndBrickCollision() {
    function checkBrickTopOrBottomEdge() {
        for(const brick of bricks) {
            const ballTopEdge = ball.y - ball.radius;
            const ballBottomEdge = ball.y + ball.radius;
            const ballLeftEdge = ball.x - ball.radius;
            const ballRightEdge = ball.x + ball.radius;
            const ballWidthMidPoint = ball.x;

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
                    ball.speedX = angle;
                    ball.speedY = -ball.speedY;
                }
            }
        }
    }

    function checkBrickLeftOrRightEdge() {
        for(const brick of bricks) {
            const ballTopEdge = ball.y - ball.radius;
            const ballBottomEdge = ball.y + ball.radius;
            const ballLeftEdge = ball.x - ball.radius;
            const ballRightEdge = ball.x + ball.radius;

            const brickTopEdge = brick.y;
            const brickBottomEdge = brick.y + brick.height;
            const brickLeftEdge = brick.x;
            const brickRightEdge = brick.x + brick.width;
            const brickWidthMidPoint = brick.x + (brick.width / 2);

            if(ballBottomEdge >= brickTopEdge && ballTopEdge <= brickBottomEdge) {
                if((ballRightEdge >= brickLeftEdge && ballRightEdge <= brickWidthMidPoint) || (ballLeftEdge <= brickRightEdge && ballLeftEdge >= brickWidthMidPoint)) {
                    bricks.splice(bricks.indexOf(brick), 1);
                    ball.speedX = -ball.speedX;
                }
            }
        }
    }

    checkBrickTopOrBottomEdge();
    checkBrickLeftOrRightEdge();
}


let pause = false;
document.addEventListener('keydown' , (e) => {
    if(e.key == 'p') {
        if(pause == false) {
            stop();
            pause = true;
        } else {
            start();
            pause = false;
        }
    }
});

start();
