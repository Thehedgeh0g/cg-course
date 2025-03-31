import {Shape} from "../Common/Shape";
import {WebGLRenderer} from "../Common/WebGLRenderer";

export class Line extends Shape {
    private length: number

    constructor(x1: number, y1: number, length: number) {
        super(x1, y1);
		this.length = length
	}

    draw(renderer: WebGLRenderer, color: [number, number, number, number]) {
        const [rx1, ry1] = this.rotatePoint(this.x, this.y);
        const [rx2, ry2] = this.rotatePoint(this.x + length, this.y + length);
        renderer.drawShape([rx1, ry1, rx2, ry2], color);
    }
}