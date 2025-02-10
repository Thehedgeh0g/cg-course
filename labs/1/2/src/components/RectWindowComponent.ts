import {ComponentInterface} from "./ComponentInterface";

export class RectWindowComponent implements ComponentInterface {
	constructor(
		private height: number,
		private width: number,
		private x: number,
		private y: number,
	) {}

	draw(ctx: CanvasRenderingContext2D): void {
		ctx.fillStyle = "blue";
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
}
