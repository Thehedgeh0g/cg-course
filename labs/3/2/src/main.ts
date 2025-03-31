import {EngineView} from "./View/EngineView";
import {WebGLRenderer} from "./Common/WebGLRenderer";
import {Rectangle} from "./Primitives/Rectangle";
import {Line} from "./Primitives/Line";
import {Circle} from "./Primitives/Circle";

export class SceneManager {
    private static FRAME_DURATION = 16;
    private engineView: EngineView;
    private startTime: number | null = null
    private lastFrameTime: number | null = null

    constructor() {
        const canvas = document.createElement("canvas");
        document.body.appendChild(canvas);

        const renderer = new WebGLRenderer(canvas);

        this.engineView = new EngineView(renderer, {x: 500, y: 890}, 6, 100, 2)

        this.addObjectsToScene();

        this.animate();
    }

    private addObjectsToScene(): void {
        this.engineView.Draw()
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
        }

        setTimeout(() => this.animate(), SceneManager.FRAME_DURATION);
    }
}

const sceneManager = new SceneManager();
