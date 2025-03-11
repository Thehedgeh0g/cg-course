import * as THREE from "three";
import { Point } from "../Common/Common";

export class Rectangle {
	public rectangle: THREE.Mesh;

	constructor(center: Point, width: number, height: number, color: number = 0x0000ff) {
		const geometry = new THREE.PlaneGeometry(width, height);
		const material = new THREE.MeshBasicMaterial({
			color: color,
			side: THREE.DoubleSide
		});

		this.rectangle = new THREE.Mesh(geometry, material);
		this.UpdateCenter(center);
	}

	public UpdateCenter(center: Point) {
		this.rectangle.position.set(center.x, center.y, 0);
	}

	public UpdateSize(width: number, height: number) {
		this.rectangle.geometry.dispose();
		this.rectangle.geometry = new THREE.PlaneGeometry(width, height);
	}

	public Rotate(angle: number) {
		this.rectangle.rotation.z = angle;
	}

	public AddToScene(scene: THREE.Scene) {
		scene.add(this.rectangle);
	}
}
