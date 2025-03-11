import * as THREE from "three";

export class LogarithmicSpiral {
	public mesh: THREE.Line;

	constructor(a: number = 1, b: number = 0.2, step: number = 0.01) {
		const points = [];
		for (let theta = 0; theta <= 10 * Math.PI; theta += step) {
			const r = a * Math.exp(b * theta);
			const x = r * Math.cos(theta);
			const y = r * Math.sin(theta);
			points.push(new THREE.Vector3(x, y, 0));
		}

		const geometry = new THREE.BufferGeometry().setFromPoints(points);
		const material = new THREE.LineBasicMaterial({color: 0x00ff00});
		this.mesh = new THREE.Line(geometry, material);
	}
}
