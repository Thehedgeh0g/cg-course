import {Point} from "../Common/Common";
import {Line} from "../Primitives/Line";
import * as THREE from "three";

export class ValveView {
	private line: Line;

	constructor(start: Point, end: Point) {
		this.line = new Line(start, end, 0x800000, 6);
	}

	public Update(start: Point, end: Point) {
		this.line.Update(start, end);
	}

	public AddToScene(scene: THREE.Scene) {
		this.line.AddToScene(scene);
	}
}
