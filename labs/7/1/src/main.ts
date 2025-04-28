import { createShaderProgram } from "./webGLUtils";

class Application {
    private canvas: HTMLCanvasElement;
    private gl: WebGLRenderingContext;

    private program: WebGLProgram;
    private vertices: number[] = [];

    constructor() {
        this.canvas = document.createElement('canvas');
        document.body.appendChild(this.canvas);
        window.addEventListener('resize', this.resizeCanvas);

        const gl = this.canvas.getContext('webgl');
        if (!gl) throw new Error('WebGL не поддерживается');
        this.gl = gl;

        this.program = createShaderProgram(gl);
        gl.useProgram(this.program);

        this.initVertices();
        this.resizeCanvas();
    }

    private initVertices() {
        const step = Math.PI / 10000;
        for (let x = 0; x <= 2 * Math.PI; x += step) {
            this.vertices.push(x);
        }

        const vertexBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.vertices), this.gl.STATIC_DRAW);

        const a_x = this.gl.getAttribLocation(this.program, 'a_x');
        this.gl.enableVertexAttribArray(a_x);
        this.gl.vertexAttribPointer(a_x, 1, this.gl.FLOAT, false, 0, 0);
    }

    run() {
        requestAnimationFrame(this.render);
    }

    private render = () => {
        this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0); // черный фон
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);

        const u_aspect = this.gl.getUniformLocation(this.program, 'u_aspect');
        const aspect = this.canvas.width / this.canvas.height;
        this.gl.uniform1f(u_aspect, aspect);

        this.gl.drawArrays(this.gl.LINE_STRIP, 0, this.vertices.length);

        // Продолжаем цикл отрисовки
        requestAnimationFrame(this.render);
    }

    private resizeCanvas = () => {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
}

const app = new Application();
app.run();
