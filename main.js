"use strict";

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

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
let brickX = 2;
let brickY = 2;
const brickWidth = 50;
const brickHeight = 16;
const brickColor = "green";
const bricks = [];
for(let i = 0; i < 9; i++) {
    bricks.push(new Brick(brickX, brickY, brickWidth, brickHeight, brickColor));
    brickX += brickWidth + 2;
}

// Game Object
new Game();
