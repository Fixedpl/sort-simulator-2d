
class Canvas2D {

    constructor(width, height, col) {
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.width = width;
        this.height = height;
        this.canvas.width = width;
        this.canvas.height = height;
        this.col = col;
        
        this.prevTimestamp = undefined;
    }

    run() {
        requestAnimationFrame(this.loop.bind(this));
    }

    htmlObj() {
        return this.canvas;
    }

    loop(timestamp) {
        if (this.prevTimestamp === undefined) {
            this.prevTimestamp = timestamp;
        }
        let dt = timestamp - this.prevTimestamp;
        this.prevTimestamp = timestamp;
    
        this.drawBackground();
        
        this.onUpdate(dt);

        requestAnimationFrame(this.loop.bind(this));
    }

    onUpdate(dt) {}

    drawBackground() {
        this.ctx.fillStyle = `rgb(${this.col[0]}, ${this.col[1]}, ${this.col[2]})`;
        this.ctx.fillRect(0, 0, this.width, this.height);
    }

}
