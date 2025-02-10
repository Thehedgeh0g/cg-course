import {ComponentInterface} from "./ComponentInterface";

export class WallComponent implements ComponentInterface {
	constructor(
		private height: number,
		private width: number,
		private x: number,
		private y: number,
		private color: string,
	) {}

	draw(ctx: CanvasRenderingContext2D): void {
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
}
