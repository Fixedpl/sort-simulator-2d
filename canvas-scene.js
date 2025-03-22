

class CanvasScene extends Scene {

    constructor(ctx) {
        super();
        this.ctx = ctx;

        this.animPlayer = new AnimationPlayer();
        this.animPlayer.play();

        this.animFactory = new AnimFactory();

        this.drawables = new Map();
        this.data = new Map();
    }

    onUpdate(dt) {
        for(let drawable of this.drawables.values()) {
            drawable.draw();
        }

        this.animPlayer.onUpdate(dt);
    }

}
