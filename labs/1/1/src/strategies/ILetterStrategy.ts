import {DrawStrategyInterface} from "./DrawStrategyInterface";

export class ILetterStrategy implements DrawStrategyInterface {
	draw(ctx: CanvasRenderingContext2D, x: number, y: number): void {
		ctx.moveTo(x + 40, y);
		ctx.lineTo(x + 40, y + 120);
		ctx.moveTo(x, y + 120);
		ctx.lineTo(x + 80, y + 120);
		ctx.moveTo(x, y);
		ctx.lineTo(x + 80, y);
	}
}
