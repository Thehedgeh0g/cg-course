import {ComponentInterface} from "./ComponentInterface";

export class CloudComponent implements ComponentInterface {
	constructor(
		private x: number,
		private y: number,
	) {}

	draw(ctx: CanvasRenderingContext2D): void {
		ctx.fillStyle = "#FFFFFF";

		const numCircles = Math.floor(3 + Math.random() * 3);

		for (let i = 0; i < numCircles; i++) {
			const radius = 20 + Math.random() * 15;
			const offsetX = i * (radius * 0.8);
			const offsetY = Math.random() * 10 - 5;

			ctx.beginPath();
			ctx.arc(this.x + offsetX, this.y + offsetY, radius, 0, Math.PI * 2);
			ctx.fill();
		}
	}
}
