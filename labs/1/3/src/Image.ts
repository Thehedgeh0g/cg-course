export class Point {
	public x: number;
	public y: number;
}

export class Image {
	constructor(private ctx: CanvasRenderingContext2D) {}

	setPixel(point: Point, color: string): void {
		this.ctx.fillStyle = color;
		this.ctx.fillRect(point.x, point.y, 1, 1);
	}
}
