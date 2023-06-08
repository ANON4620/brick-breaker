"use strict";

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Paddle Object
const paddleWidth = (20 / 100) * canvas.width; // 30% of canvas width
const paddleHeight = (3 / 100) * canvas.height; // 3% of canvas height
const paddleX = (canvas.width / 2) - (paddleWidth / 2); // position paddle at the center of canvas
const paddleY = canvas.height - (paddleHeight * 2);
const paddleColor = "red";
const paddle = new Paddle(paddleX, paddleY, paddleWidth, paddleHeight, paddleColor);

// Ball Object
const ballRadius = (2 / 100) * canvas.height;
const ballX = paddleX + (paddleWidth / 2); // position ball at the center of paddle
const ballY = paddleY - ballRadius - 1; // position ball on top of paddle
const ballStartAngle = 0 * Math.PI;
const ballEndAngle = 2 * Math.PI;
const ballSpeedX = 0;
const ballSpeedY = (50 / 100) * ballRadius; // 50% of ball radius
const ballColor = "blue";
const ball = new Ball(ballX, ballY, ballRadius, ballStartAngle, ballEndAngle, ballSpeedX, ballSpeedY, ballColor);

// Brick Objects
const row = 5;
const col = 6;
const brickWidth = (canvas.width / col);
const brickHeight = (5 / 100) * canvas.height; // 5% of canvas height
const brickColors = ["violet", "indigo", "blue", "green", "yellow", "orange", "red", "brown", "gold"];
const borderThickness = 2;
const borderColor = "black";
const bricks = [];
let brickX = (canvas.width / 2) - ((brickWidth * col) / 2);
let brickY = 0;
for(let i = 1; i <= row; i++) {
    const randomIndex = Math.floor(Math.random() * brickColors.length);
    const brickColor = brickColors[randomIndex];
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
    ball.checkObjectCollision(paddle);

    for(const brick of bricks) {
        if(ball.checkObjectCollision(brick)) {
            bricks.splice(bricks.indexOf(brick), 1);
        }
    }

    if(ball.outOfCanvas()) {
        stop();
        return;
    }
    
    id = requestAnimationFrame(update);
}

function movePaddleWithMouse(e) {paddle.move(e.clientX)};
function movePaddleWithTouch(e) {paddle.move(e.touches[0].clientX)};

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
