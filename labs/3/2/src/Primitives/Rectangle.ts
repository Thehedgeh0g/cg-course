import {Shape} from "../Common/Shape";
import {WebGLRenderer} from "../Common/WebGLRenderer";

export class Rectangle extends Shape {
	constructor(x: number, y: number, private width: number, private height: number) {
		super(x, y);
	}

	draw(renderer: WebGLRenderer, color: [number, number, number, number]) {
		const corners = [
			[this.x, this.y],
			[this.x + this.width, this.y],
			[this.x, this.y + this.height],
			[this.x + this.width, this.y],
			[this.x + this.width, this.y + this.height],
			[this.x, this.y + this.height]
		].map(([px, py]) => this.rotatePoint(px, py)).flat();

		renderer.drawShape(corners, color);
	}
}