import {ComponentInterface} from "./ComponentInterface";

export class DoorComponent implements ComponentInterface {
	constructor(
		private height: number,
		private width: number,
		private x: number,
		private y: number,
	) {}

	draw(ctx: CanvasRenderingContext2D): void {
		ctx.fillStyle = "brown";
		ctx.fillRect(this.x, this.y, this.width, this.height);

		ctx.fillStyle = "gold";
		ctx.beginPath();
		ctx.arc(
			this.x + this.width - 10,
			this.y + this.height / 2,
			5,
			0,
			Math.PI * 2,
		);
		ctx.fill();
	}
}
