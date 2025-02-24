import {ComponentInterface} from "./ComponentInterface";

export class SkyComponent implements ComponentInterface {
	constructor(private color: string = "#87CEEB") {}

	draw(ctx: CanvasRenderingContext2D): void {
		ctx.fillStyle = this.color;
		ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	}
}
