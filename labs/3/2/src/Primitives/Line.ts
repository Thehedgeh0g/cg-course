import * as THREE from "three";
import { Line2 } from "three/examples/jsm/lines/Line2.js";
import {Point} from "../Common/Common";
import {LineMaterial} from "three/examples/jsm/lines/LineMaterial";
import {LineGeometry} from "three/examples/jsm/lines/LineGeometry";

export class Line {
	public line: Line2;

	constructor(start: Point, end: Point, color: number = 0x0000ff, thickness: number = 3) {
		const geometry = new LineGeometry();
		geometry.setPositions([start.x, start.y, 0, end.x, end.y, 0]);

		const material = new LineMaterial({
			color: color,
			linewidth: thickness,
			resolution: new THREE.Vector2(window.innerWidth, window.innerHeight),
		});

		this.line = new Line2(geometry, material);
		this.line.computeLineDistances();
	}

	public Update(start: Point, end: Point) {
		this.line.geometry.setFromPoints([
			new THREE.Vector3(start.x, start.y, 0),
			new THREE.Vector3(end.x, end.y, 0),
		]);
	}

	public AddToScene(scene: THREE.Scene) {
		scene.add(this.line);
	}
}
