class Paddle {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;

        this.draw();
    }

    draw() {
        const x = this.x;
        const y = this.y;
        const width = this.width;
        const height = this.height;
        const color = this.color;

        ctx.fillStyle = color;
        ctx.fillRect(x, y, width, height);
    }

    move(pointerX) {
        if(this.touchingEdge(pointerX)) {
            return;
        }
        
        this.x = pointerX - (this.width / 2);
    }

    touchingEdge(pointerX) {
        if(pointerX <= (this.width / 2)) {
            this.x = 0;
            return true;
        }
        else if(pointerX >= canvas.width - (this.width / 2)) {
            this.x = canvas.width - this.width;
            return true;
        }
        else {
            return false;
        }
    }
}
