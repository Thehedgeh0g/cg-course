import {Rectangle} from "../Primitives/Rectangle";
import {Point} from "../Common/Common";
import {Scene} from "three";

export class PistonView {
	private rectangle: Rectangle;

	constructor(height: number, width: number, center: Point) {
		this.rectangle = new Rectangle(center, width, height, 0xffffff);
	}

	public UpdatePos(newPos: Point) {
		this.rectangle.UpdateCenter({x: newPos.x, y: newPos.y});
	}

	public AddToScene(scene: Scene) {
		this.rectangle.AddToScene(scene);
	}
}
