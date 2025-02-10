import {ComponentInterface} from "./ComponentInterface";

export class ChimneyComponent implements ComponentInterface {
	constructor(
		private x: number,
		private y: number,
		private width: number,
		private height: number,
	) {}

	draw(ctx: CanvasRenderingContext2D): void {
		ctx.fillStyle = "#6B4F4F";
		ctx.fillRect(this.x, this.y, this.width, this.height);

		ctx.fillStyle = "#CCCCCC";
		for (let i = 0; i < 3; i++) {
			ctx.beginPath();
			ctx.arc(
				this.x + this.width / 2,
				this.y - i * 15,
				10 - i * 2,
				0,
				Math.PI * 2,
			);
			ctx.fill();
		}
	}
}
