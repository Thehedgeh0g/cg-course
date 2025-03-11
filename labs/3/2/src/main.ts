import * as THREE from "three";
import {EngineView} from "./View/EngineView";
import {Axis} from "./Common/axis";

export class SceneManager {
    private static FRAME_DURATION = 16;
    private readonly scene: THREE.Scene;
    private readonly camera: THREE.PerspectiveCamera;
    private renderer: THREE.WebGLRenderer;
    private engineView: EngineView;
    private startTime: number | null = null
    private lastFrameTime: number | null = null
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
        this.axis = new Axis();
        this.engineView = new EngineView({x: 0, y: 0}, 6, 1, 100)

        this.addObjectsToScene();

        this.animate();
        this.setupResizeListener();
    }

    private addObjectsToScene(): void {
        this.engineView.AddToScene(this.scene)
    }

    private animate(): void {
        const currentTime = Date.now();
        if (this.startTime === null){
            this.startTime = Date.now()
        }

        if ((this.lastFrameTime === null && this.lastFrameTime !== 0) || currentTime - this.lastFrameTime >= SceneManager.FRAME_DURATION) {
            let diffTime = (currentTime - (this.startTime ?? currentTime))

            this.lastFrameTime = currentTime;
            this.engineView.Update(diffTime);

            this.renderer.render(this.scene, this.camera);
        }

        setTimeout(() => this.animate(), SceneManager.FRAME_DURATION);
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
