import {Rectangle} from "../Primitives/Rectangle";
import {Point} from "../Common/Common";
import {c} from "vite/dist/node/moduleRunnerTransport.d-CXw_Ws6P";
import {WebGLRenderer} from "../Common/WebGLRenderer";

export class PistonView {
	private rectangle: Rectangle;
	private center: Point
	private height: number
	private width: number
	private context: WebGLRenderer

	constructor(context: WebGLRenderer, height: number, width: number, center: Point) {
		this.context = context
		this.center = {x: center.x, y: center.y}
		this.width = width
		this.height = height
		let leftTop = {x: this.center.x - this.width/2, y: this.center.y+this.height/2}
		this.rectangle = new Rectangle(leftTop.x, leftTop.y, this.width, this.height);
	}

	public UpdatePos(newPos: Point) {
		let leftTop = {x: this.center.x + this.width/2 + newPos.x, y: this.center.y+this.height/2+newPos.y}
		this.rectangle.setPosition(leftTop.x, leftTop.y);
	}

	public Draw() {
		this.rectangle.draw(this.context, [1, 1, 1, 1]);
	}
}
