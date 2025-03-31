import {Shape} from "../Common/Shape";
import {WebGLRenderer} from "../Common/WebGLRenderer";

export class Circle extends Shape {
    constructor(cx: number, cy: number, private radius: number) {
        super(cx, cy);
    }

    draw(renderer: WebGLRenderer, color: [number, number, number, number]) {
        const segments = 30;
        const vertices = [];
        for (let i = 0; i < segments; i++) {
            const theta = (i / segments) * Math.PI * 2;
            const x = this.x + this.radius * Math.cos(theta);
            const y = this.y + this.radius * Math.sin(theta);
            const [rx, ry] = this.rotatePoint(x, y);
            vertices.push(rx, ry);
        }
        renderer.drawShape(vertices, color);
    }
}