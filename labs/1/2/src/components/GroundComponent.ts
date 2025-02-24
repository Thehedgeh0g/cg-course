import {ComponentInterface} from "./ComponentInterface";

export class GroundComponent implements ComponentInterface {
	constructor(
		private y: number,
		private color: string = "#228B22",
	) {}

	draw(ctx: CanvasRenderingContext2D): void {
		ctx.fillStyle = this.color;
		ctx.fillRect(0, this.y, ctx.canvas.width, ctx.canvas.height - this.y);
	}
}
