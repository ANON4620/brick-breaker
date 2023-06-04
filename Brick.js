class Brick {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;

        this.draw(this.x, this.y, this.width, this.height);
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
}