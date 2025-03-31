export class WebGLRenderer {
    private gl: WebGLRenderingContext;
    private program: WebGLProgram;

    constructor(private canvas: HTMLCanvasElement) {
        this.gl = canvas.getContext("webgl")!;
        if (!this.gl) {
            throw new Error("WebGL not supported");
        }
        this.resizeCanvas();
        window.addEventListener("resize", () => this.resizeCanvas());
        this.program = this.initShaders();
        this.gl.useProgram(this.program);
    }

    private resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    }

    private initShaders(): WebGLProgram {
        const vertexShaderSource = `
            attribute vec2 a_position;
            uniform vec2 u_resolution;
            void main() {
                vec2 zeroToOne = a_position / u_resolution;
                vec2 zeroToTwo = zeroToOne * 2.0;
                vec2 clipSpace = zeroToTwo - 1.0;
                gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
            }`;

        const fragmentShaderSource = `
            precision mediump float;
            uniform vec4 u_color;
            void main() {
                gl_FragColor = u_color;
            }`;

        const vertexShader = this.createShader(this.gl.VERTEX_SHADER, vertexShaderSource);
        const fragmentShader = this.createShader(this.gl.FRAGMENT_SHADER, fragmentShaderSource);

        const program = this.gl.createProgram()!;
        this.gl.attachShader(program, vertexShader);
        this.gl.attachShader(program, fragmentShader);
        this.gl.linkProgram(program);
        if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
            throw new Error("Program failed to link: " + this.gl.getProgramInfoLog(program));
        }
        return program;
    }

    private createShader(type: number, source: string): WebGLShader {
        const shader = this.gl.createShader(type)!;
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);
        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            throw new Error("Shader compile failed: " + this.gl.getShaderInfoLog(shader));
        }
        return shader;
    }

    drawShape(vertices: number[], color: [number, number, number, number]) {
        const buffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertices), this.gl.STATIC_DRAW);

        const positionLocation = this.gl.getAttribLocation(this.program, "a_position");
        this.gl.enableVertexAttribArray(positionLocation);
        this.gl.vertexAttribPointer(positionLocation, 2, this.gl.FLOAT, false, 0, 0);

        const resolutionLocation = this.gl.getUniformLocation(this.program, "u_resolution");
        this.gl.uniform2f(resolutionLocation, this.gl.canvas.width, this.gl.canvas.height);

        const colorLocation = this.gl.getUniformLocation(this.program, "u_color");
        this.gl.uniform4fv(colorLocation, color);
        this.gl.drawArrays(this.gl.TRIANGLES, 0, vertices.length / 2);
    }
}