import * as THREE from "three";
import {Axis} from "./Axis";
import {LogarithmicSpiral} from "./graph";

export class SceneManager {
	private readonly scene: THREE.Scene;
	private readonly camera: THREE.PerspectiveCamera;
	private renderer: THREE.WebGLRenderer;
	private spiral: LogarithmicSpiral;
	private axis: Axis;

	constructor() {
		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera(
			90,
			window.innerWidth / window.innerHeight,
		);
		this.camera.position.z = 15;

		this.renderer = new THREE.WebGLRenderer();
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		document.body.appendChild(this.renderer.domElement);

		this.spiral = new LogarithmicSpiral(0.15, 0.15, 0.00001);
		this.axis = new Axis();

		this.addObjectsToScene();

		this.animate();
		this.setupResizeListener();
	}

	private addObjectsToScene(): void {
		this.scene.add(this.axis.xAxis);
		this.scene.add(this.axis.yAxis);
		this.axis.stepsX.forEach((tick) => this.scene.add(tick));
		this.axis.stepsY.forEach((tick) => this.scene.add(tick));

		this.scene.add(this.spiral.mesh);
	}

	private animate(): void {
		requestAnimationFrame(() => this.animate());
		this.renderer.render(this.scene, this.camera);
	}

	private setupResizeListener(): void {
		window.addEventListener("resize", () => {
			const width = window.innerWidth;
			const height = window.innerHeight;
			this.renderer.setSize(width, height);
			this.camera.aspect = width / height;
			this.camera.updateProjectionMatrix();
		});
	}
}

const sceneManager = new SceneManager();
