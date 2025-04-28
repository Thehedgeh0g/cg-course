import {Labyrinth} from "./labyrinth";
import {LabyrinthView} from "./labyrinthView";
import {Player} from "./player";
import {mat4} from "gl-matrix";
import {Cube} from "./cube";
import {createShaderProgram} from "./webGLUtils";
import {PlayerControl} from "./playerControl.ts";

class Application {
    private canvas: HTMLCanvasElement
    private gl: WebGLRenderingContext
    private program: WebGLProgram
    private labyrinth: Labyrinth
    private vLabyrinth: LabyrinthView
    private playerControls: PlayerControl
    private cube: Cube

    private lastTime: number = 0

    constructor() {
        const texturePaths = [
            '../textures/stone.jpg',
            '../textures/brick.jpg',
            '../textures/bad.jpg',
            '../textures/concrete.jpg'
        ];

        this.canvas = document.createElement('canvas')
        window.addEventListener('resize', this.resizeCanvas)
        document.body.appendChild(this.canvas)
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight
        const gl = this.canvas.getContext('webgl')
        if (!gl) throw new Error('WebGL не поддерживается')
        this.gl = gl


        this.program = createShaderProgram(gl)
        gl.useProgram(this.program)

        const matrixLoc = gl.getUniformLocation(this.program, 'u_matrix')
        const textureLoc = gl.getUniformLocation(this.program, 'u_texture')
        if (!matrixLoc || !textureLoc) throw new Error('Не удалось получить uniform-переменные')

        const uColorLocation = gl.getUniformLocation(this.program, 'u_color')
        gl.uniform4fv(uColorLocation, [1, 1, 1, 1]);

        this.labyrinth = new Labyrinth(texturePaths.length)
        this.playerControls = new PlayerControl(new Player(), this.labyrinth)
        this.vLabyrinth = new LabyrinthView(this.labyrinth, texturePaths, this.gl, matrixLoc, textureLoc)
        this.cube = new Cube(this.gl, this.program)
    }

    run() {
        this.render(this.lastTime)
    }

    private render = (time: number) => {
        const deltaTime = (time - this.lastTime) / 1000
        this.lastTime = time
        requestAnimationFrame(this.render)
        this.gl.enable(this.gl.DEPTH_TEST)
        this.gl.clearColor(0.3, 0.3, 1, 1)
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT)

        this.playerControls.updatePlayer(deltaTime)

        const projectionMatrix = this.calcProjectionMatrix()
        const viewMatrix = this.playerControls.calcPlayerViewMatrix()

        this.vLabyrinth.draw(this.cube.getIndicesCount(), projectionMatrix, viewMatrix)
    }

    private resizeCanvas = () => {
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight
        this.gl.viewport(0, 0, window.innerWidth, window.innerHeight)
    }

    private calcProjectionMatrix() {
        const projectionMatrix = mat4.create()
        const fov = (60 * Math.PI) / 180
        const aspect = this.canvas.width / this.canvas.height
        const near = 0.1
        const far = 100
        mat4.perspective(projectionMatrix, fov, aspect, near, far)

        return projectionMatrix
    }
}

const app = new Application()
app.run()