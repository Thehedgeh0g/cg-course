import {DrawStrategyInterface} from "./strategies/DrawStrategyInterface";

export class Letter {
    private static readonly INIT_Y: number = 350;
    private static readonly FRAME_DURATION: number = 350;
    constructor(
        private letterDrawStrategy: DrawStrategyInterface,
        private x: number,
        private color: string,
        private initialY: number = Letter.INIT_Y,
        private startTime: number | null = null,
        private animationOffset: number = 0
    ) {
    }

    draw(ctx: CanvasRenderingContext2D, currentTime: number): void {
        if (this.startTime === null) {
            this.startTime = currentTime;
        }
        let frame = (currentTime-this.startTime)/Letter.FRAME_DURATION
        let frameOffset = (Math.PI/4)*this.animationOffset
        let y = Math.cos(frame % (Math.PI*2) + frameOffset) + this.initialY
        this.initialY = y
        ctx.fillStyle = this.color;

        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;

        ctx.beginPath();
        this.letterDrawStrategy.draw(ctx, this.x, y);

        ctx.stroke();

    }

}