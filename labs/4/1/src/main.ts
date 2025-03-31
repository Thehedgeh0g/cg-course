import {createShaderProgram} from "./Common/WebGLUtils";
import {BaseShape} from "./Shapes/Shape";
import {IcosaDodecahedron} from "./Shapes/IcosaDodecahedron";

export class SceneManager {
    private static FRAME_DURATION = 8;
    private startTime: number | null = null
    private lastFrameTime: number | null = null
    private shape: BaseShape
    private canvas: HTMLCanvasElement

    constructor() {
        this.canvas = document.createElement("canvas");
        document.body.appendChild(this.canvas);
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight

        const gl = this.canvas.getContext('webgl');
        if (!gl) {
            alert('WebGL не поддерживается этим браузером');
        }

        const shaderProgram = createShaderProgram(gl);

        gl.clearColor(0.0, 0.0, 0.0, 1.0); // установить в качестве цвета очистки буфера цвета чёрный, полная непрозрачность
        gl.enable(gl.DEPTH_TEST); // включает использование буфера глубины
        gl.depthFunc(gl.LEQUAL); // определяет работу буфера глубины: более ближние объекты перекрывают дальние
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); // очистить буфер цвета и буфер глубины.
        gl.viewport(0, 0, this.canvas.width, this.canvas.height);

        this.shape = new IcosaDodecahedron(gl, shaderProgram)
        this.animate()
    }

    private animate(): void {
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight
        const currentTime = Date.now();
        if (this.startTime === null){
            this.startTime = Date.now()
        }

        if ((this.lastFrameTime === null && this.lastFrameTime !== 0) || currentTime - this.lastFrameTime >= SceneManager.FRAME_DURATION) {
            let diffTime = (currentTime - (this.startTime ?? currentTime))

            this.lastFrameTime = currentTime;
            this.shape.render(diffTime/1060000);
        }

        setTimeout(() => this.animate(), SceneManager.FRAME_DURATION);
    }
}

const sceneManager = new SceneManager();