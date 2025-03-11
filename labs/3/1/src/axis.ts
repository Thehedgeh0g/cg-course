import * as THREE from "three";

export class Axis {
	public xAxis: THREE.Line;
	public yAxis: THREE.Line;
	public stepsX: THREE.Line[];
	public stepsY: THREE.Line[];

	constructor(length: number = 25, stepLength: number = 1) {
		this.xAxis = this.buildX(length);
		this.yAxis = this.buildY(length);
		this.stepsX = this.createStepsX(length, stepLength);
		this.stepsY = this.createStepsY(length, stepLength);
	}

	private buildX(length: number) {
		const geom = new THREE.BufferGeometry().setFromPoints([
			new THREE.Vector3(-length, 0, 0),
			new THREE.Vector3(length, 0, 0),
		]);
		const mat = new THREE.LineBasicMaterial({color: 0x0000ff});
		return new THREE.Line(geom, mat);
	}

	private buildY(length: number) {
		const geom = new THREE.BufferGeometry().setFromPoints([
			new THREE.Vector3(0, -length, 0),
			new THREE.Vector3(0, length, 0),
		]);
		const mat = new THREE.LineBasicMaterial({color: 0x0000ff});
		return new THREE.Line(geom, mat);
	}

	private createStepsX(length: number, stepLength: number): THREE.Line[] {
		const steps: THREE.Line[] = [];
		for (let i = -length; i <= length; i += stepLength) {
			const geom = new THREE.BufferGeometry().setFromPoints([
				new THREE.Vector3(i, -0.1, 0),
				new THREE.Vector3(i, 0.1, 0),
			]);
			const mat = new THREE.LineBasicMaterial({color: 0xffffff});
			const step = new THREE.Line(geom, mat);
			steps.push(step);
		}
		return steps;
	}

	private createStepsY(length: number, stepLength: number): THREE.Line[] {
		const steps: THREE.Line[] = [];
		for (let i = -length; i <= length; i += stepLength) {
			const geom = new THREE.BufferGeometry().setFromPoints([
				new THREE.Vector3(-0.1, i, 0),
				new THREE.Vector3(0.1, i, 0),
			]);
			const mat = new THREE.LineBasicMaterial({color: 0xffffff});
			const step = new THREE.Line(geom, mat);
			steps.push(step);
		}
		return steps;
	}
}
