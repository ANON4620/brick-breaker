"use strict";

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
let pause = false;

document.addEventListener('keydown' , (e) => {
    if(e.key == 'p') {
        if(pause == false) {
            Game.stop();
            pause = true;
        } else {
            Game.start();
            pause = false;
        }
    }
});

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
const ballSpeedX = 5;
const ballSpeedY = 5;
const ballColor = "blue";
const ball = new Ball(ballX, ballY, ballRadius, ballStartAngle, ballEndAngle, ballSpeedX, ballSpeedY, ballColor);

// Brick Objects
const row = 5;
const col = 10;
const brickWidth = (canvas.width / col) - 2;
const brickHeight = 16;
const brickColor = "green";
const borderThickness = 2;
const borderColor = "black";
const bricks = [];
let brickX = (canvas.width / 2) - ((brickWidth * col) / 2);
let brickY = 2;

for(let i = 1; i <= row; i++) {
    for(let j = 1; j <= col; j++) {
        bricks.push(new Brick(brickX, brickY, brickWidth, brickHeight, brickColor, borderThickness, borderColor));
        brickX += brickWidth;
    }
    brickY += brickHeight;
    brickX = (canvas.width / 2) - ((brickWidth * col) / 2);
}

// Game Object
Game.start();
