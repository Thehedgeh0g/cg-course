import {Point} from "../Common/Common";
import {Line} from "../Primitives/Line";
import {WebGLRenderer} from "../Common/WebGLRenderer";

export class RodView {
    private line: Line;
    private context: WebGLRenderer

    constructor(context: WebGLRenderer, start: Point, end: Point) {
		this.context = context
		let angle = (start.x*end.x+start.y*end.y)/(Math.sqrt(start.x ** 2 + end.x ** 2)*Math.sqrt(start.y ** 2 + end.y ** 2))
		let length = Math.sqrt((end.x-start.x) ** 2 + (end.y - start.x) ** 2)
        this.line = new Line(start.x, start.y, length);
		this.line.rotate(angle)
        console.log(start.x)
    }

    public Update(start: Point, end: Point) {
        this.line.setPosition(start.x, start.y);
		let angle = (start.x*end.x+start.y*end.y)/(Math.sqrt(start.x ** 2 + end.x ** 2)*Math.sqrt(start.y ** 2 + end.y ** 2))
		this.line.rotate(angle)
        console.log(start.x)
    }

    public Draw() {
        this.line.draw(this.context, [0.5, 0, 0, 1]);
    }
}
