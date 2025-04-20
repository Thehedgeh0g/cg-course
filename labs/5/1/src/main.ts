import {Labyrinth} from "./labyrinth";
import {LabyrinthView} from "./labyrinthView";
import {Player} from "./player";
import {mat4, vec3} from "gl-matrix";
import {Cube} from "./cube";
import {createShaderProgram} from "./webGLUtils";

class Application {
    private canvas: HTMLCanvasElement
    private gl: WebGLRenderingContext
    private program: WebGLProgram
    private labyrinth: Labyrinth
    private vLabyrinth: LabyrinthView
    private player: Player
    private cube: Cube

    private keysUp: { [key: string]: boolean } = {}
    private lastTime: number = 0

    constructor() {
        this.canvas = document.createElement('canvas')
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

        this.labyrinth = new Labyrinth(null)
        this.player = new Player()
        this.vLabyrinth = new LabyrinthView(this.labyrinth, this.gl, matrixLoc, textureLoc)
        this.cube = new Cube(this.gl, this.program)
        this.setupEventListeners()
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

        this.updatePlayer(deltaTime)

        const projectionMatrix = this.calcProjectionMatrix()
        const viewMatrix =  this.calcViewMatrix()
        this.vLabyrinth.draw(this.cube.getIndicesCount(), projectionMatrix, viewMatrix)
    }

    private updatePlayer(deltaTime: number) {
        if (this.keysUp['w']) {
            this.player.moveForward(this.labyrinth, deltaTime)
        }
        if (this.keysUp['s']) {
            this.player.moveForward(this.labyrinth, -deltaTime)
        }
        if (this.keysUp['ArrowLeft']) {
            this.player.rotate(-deltaTime)
        }
        if (this.keysUp['ArrowRight']) {
            this.player.rotate(deltaTime)
        }
        if (this.keysUp['ArrowUp']) {
            this.player.setPitch(deltaTime * this.player.rotationSpeed)
        }
        if (this.keysUp['ArrowDown']) {
            this.player.setPitch(-(deltaTime * this.player.rotationSpeed))
        }
    }

    private setupEventListeners() {
        window.addEventListener('resize', this.resizeCanvas)
        window.addEventListener('keydown', this.handleKeyDown)
        window.addEventListener('keyup', this.handleKeyUp)
    }

    private resizeCanvas = () => {
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight
        this.gl.viewport(0, 0, window.innerWidth, window.innerHeight)
    }

    private handleKeyDown = (event: KeyboardEvent) => {
        this.keysUp[event.key] = true
    }

    private handleKeyUp = (event: KeyboardEvent) => {
        this.keysUp[event.key] = false
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

    private calcViewMatrix() {
        const viewMatrix = mat4.create();
        const eye = vec3.fromValues(
            this.player.position[0],
            this.player.position[1],
            this.player.position[2]
        );

        const center = vec3.fromValues(
            eye[0] + Math.cos(this.player.direction) * Math.cos(this.player.pitch),
            eye[1] + Math.sin(this.player.pitch),
            eye[2] + Math.sin(this.player.direction) * Math.cos(this.player.pitch)
        );

        const up = vec3.fromValues(0, 1, 0);
        mat4.lookAt(viewMatrix, eye, center, up);

        return viewMatrix;
    }
}

const app = new Application()
app.run()