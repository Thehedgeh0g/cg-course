import { createShaderProgram } from "./webGLUtils";

class Application {
    private canvas: HTMLCanvasElement;
    private gl: WebGLRenderingContext;

    private program: WebGLProgram;
    private vertexBuffer: WebGLBuffer;
    private vertexCount: number;

    constructor() {
        this.canvas = document.createElement('canvas');
        document.body.appendChild(this.canvas);
        window.addEventListener('resize', this.resizeCanvas);

        const gl = this.canvas.getContext('webgl');
        if (!gl) throw new Error('WebGL не поддерживается');
        this.gl = gl;

        this.program = createShaderProgram(gl);
        gl.useProgram(this.program);

        this.resizeCanvas();
        this.setupGeometry();
    }

    private setupGeometry() {
        const gl = this.gl;

        const vertices = new Float32Array([
            -1.0, -1.0, 0.0,
            1.0, -1.0, 0.0,
            1.0,  1.0, 0.0,
            -1.0,  1.0, 0.0
        ]);
        this.vertexCount = 4;

        this.vertexBuffer = gl.createBuffer()!;
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

        const positionAttribLocation = gl.getAttribLocation(this.program, "position");
        gl.enableVertexAttribArray(positionAttribLocation);
        gl.vertexAttribPointer(positionAttribLocation, 3, gl.FLOAT, false, 0, 0);
    }

    run() {
        requestAnimationFrame(this.render);
    }

    private render = () => {
        const gl = this.gl;

        gl.viewport(0, 0, this.canvas.width, this.canvas.height);
        gl.clearColor(1.0, 1.0, 1.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.useProgram(this.program);

        const centerLocation = gl.getUniformLocation(this.program, "u_center");
        if (centerLocation) {
            gl.uniform2f(centerLocation, 2, 1.15);
        }

        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        gl.drawArrays(gl.TRIANGLE_FAN, 0, this.vertexCount);

        requestAnimationFrame(this.render);
    }

    private resizeCanvas = () => {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        if (this.gl) {
            this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
        }
    }
}

const app = new Application();
app.run();
