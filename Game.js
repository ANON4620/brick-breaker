class Game {
    constructor() {
        Game.start();
    }

    static update() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        paddle.draw();

        for(const brick of bricks) {
            brick.draw();
        }

        ball.move();
        ball.draw();
        if(ball.touchingTopEdge() || ball.touchingPaddleTopOrBottomEdge() || ball.touchingBrickTopOrBottomEdge()) {
            ball.speedY = -ball.speedY;
        }
        if(ball.touchingLeftOrRightEdge() || ball.touchingPaddleLeftOrRightEdge() || ball.touchingBrickLeftOrRightEdge()) {
            ball.speedX = -ball.speedX;
        }
        if(ball.outOfCanvas()) {
            Game.stop();
            return;
        }
        
        Game.id = requestAnimationFrame(Game.update);
    }
    
    static start() {
        canvas.addEventListener('mousemove', Game.movePaddle);
        Game.id = requestAnimationFrame(Game.update);
    }
    
    static stop() {
        canvas.removeEventListener('mousemove', Game.movePaddle);
        cancelAnimationFrame(Game.id);
        console.log('Game Stopped.');
    }
    
    static movePaddle(e) {paddle.move(e)};
}