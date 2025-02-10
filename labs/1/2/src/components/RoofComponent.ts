import {ComponentInterface} from "./ComponentInterface";

export class RoofComponent implements ComponentInterface {
	constructor(
		private x: number,
		private y: number,
		private width: number,
		private height: number,
	) {}

	draw(ctx: CanvasRenderingContext2D): void {
		ctx.fillStyle = "#B22222";
		ctx.beginPath();
		ctx.moveTo(this.x, this.y);
		ctx.lineTo(this.x + this.width / 2, this.y - this.height);
		ctx.lineTo(this.x + this.width, this.y);
		ctx.closePath();
		ctx.fill();
	}
}
