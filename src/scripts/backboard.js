export default class BackBoard {
    constructor(game) {
        this.game = game;
        this.width = 213;
        this.height = 137;
        this.reset();
    }

    reset() {
        this.x = this.game.width/2 - this.width/2;
        this.y = this.game.height/2 - this.height * 2;
        this.dx = 0;
        this.dy = 0;
        this.innerRect = {
            width: 81,
            height: 66,
        };
        this.innerRect.x = this.x + this.innerRect.width/1.25;
        this.innerRect.y = this.y + this.innerRect.height/1.5;
        this.line = {
            x1: this.innerRect.x - 5,
            y: this.innerRect.y + this.innerRect.height,
            x2: this.innerRect.x + this.innerRect.width + 5
        };
    }

    draw() {
        // backboard
        this.game.ctx.beginPath();
        this.game.ctx.rect(this.x, this.y, this.width, this.height);
        this.game.ctx.strokeStyle = "#dadde1";
        this.game.ctx.lineWidth = 5;
        this.game.ctx.stroke();
        this.game.ctx.closePath();

        // inner aim area
        this.game.ctx.beginPath();
        this.game.ctx.rect(this.innerRect.x, this.innerRect.y, this.innerRect.width, this.innerRect.height);
        this.game.ctx.strokeStyle = "#dadde1";
        this.game.ctx.lineWidth = 5;
        this.game.ctx.stroke();
        this.game.ctx.closePath();

        // rim
        this.game.ctx.beginPath();
        this.game.ctx.moveTo(this.line.x1 - this.game.ctx.lineWidth, this.line.y);
        this.game.ctx.lineTo(this.line.x2 + this.game.ctx.lineWidth, this.line.y);
        this.game.ctx.strokeStyle = "red";
        this.game.ctx.lineWidth = 8;
        this.game.ctx.stroke();
        this.game.ctx.closePath();
    }

    update() {
        if (this.x + this.width > this.game.width || this.x < 0) {
            this.dx = -this.dx;
        }
        this.x += this.dx;
        this.innerRect.x += this.dx;
        this.line.x1 += this.dx;
        this.line.x2 += this.dx;
    }

}