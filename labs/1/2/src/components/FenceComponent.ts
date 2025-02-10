import {ComponentInterface} from "./ComponentInterface";

export class FenceComponent implements ComponentInterface {
	constructor(
		private length: number,
		private x: number,
		private y: number,
	) {}

	draw(ctx: CanvasRenderingContext2D): void {
		const plankWidth = 20;
		const plankHeight = 60;
		const gap = 5;
		const numPlanks = Math.floor(this.length / (plankWidth + gap));

		ctx.fillStyle = "#8B4513";

		for (let i = 0; i < numPlanks; i++) {
			const plankX = this.x + i * (plankWidth + gap);
			ctx.fillRect(plankX, this.y, plankWidth, plankHeight);
		}

		ctx.fillRect(this.x, this.y + 15, this.length, 5);
		ctx.fillRect(this.x, this.y + 40, this.length, 5);
	}
}
