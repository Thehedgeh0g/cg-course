import {ComponentInterface} from "./ComponentInterface";

export class SunComponent implements ComponentInterface {
	constructor(
		private x: number,
		private y: number,
		private radius: number,
	) {}

	draw(ctx: CanvasRenderingContext2D): void {
		ctx.fillStyle = "yellow";
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
		ctx.fill();

		ctx.strokeStyle = "orange";
		for (let i = 0; i < 12; i++) {
			const angle = (Math.PI * 2 * i) / 12;
			const startX = this.x + Math.cos(angle) * (this.radius + 5);
			const startY = this.y + Math.sin(angle) * (this.radius + 5);
			const endX = this.x + Math.cos(angle) * (this.radius + 15);
			const endY = this.y + Math.sin(angle) * (this.radius + 15);

			ctx.beginPath();
			ctx.moveTo(startX, startY);
			ctx.lineTo(endX, endY);
			ctx.stroke();
		}
	}
}
