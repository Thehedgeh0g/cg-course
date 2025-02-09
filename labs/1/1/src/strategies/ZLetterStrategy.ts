import {DrawStrategyInterface} from "./DrawStrategyInterface";

export class ZLetterStrategy implements DrawStrategyInterface {
	draw(ctx: CanvasRenderingContext2D, x: number, y: number): void {
		ctx.moveTo(x, y);
		ctx.lineTo(x + 80, y);
		ctx.lineTo(x, y + 120);
		ctx.lineTo(x + 80, y + 120);
	}
}
