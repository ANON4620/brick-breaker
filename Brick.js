class Brick {
    constructor(x, y, width, height, color, borderThickness, borderColor) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.borderThickness = borderThickness;
        this.borderColor = borderColor;

        this.draw(this.x, this.y, this.width, this.height);
    }

    draw() {
        const x = this.x;
        const y = this.y;
        const width = this.width;
        const height = this.height;
        const color = this.color;
        const borderThickness = this.borderThickness;
        const borderColor = this.borderColor;

        ctx.fillStyle = borderColor;
        ctx.fillRect(x, y, width, height);
        ctx.fillStyle = color;
        ctx.fillRect(x + borderThickness, y + borderThickness, width - (borderThickness * 2), height - (borderThickness * 2));
    }
}