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

    move(e) {
        if(this.touchingEdge(e)) {
            return;
        }
        
        this.x = e.clientX - (this.width / 2);
    }

    touchingEdge(e) {
        if(e.clientX <= (this.width / 2)) {
            this.x = 0;
            return true;
        }
        else if(e.clientX >= canvas.width - (this.width / 2)) {
            this.x = canvas.width - this.width;
            return true;
        }
        else {
            return false;
        }
    }
}
