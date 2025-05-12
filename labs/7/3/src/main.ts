import { createShaderProgram } from "./webGLUtils";

class Application {
    private canvas: HTMLCanvasElement;
    private gl: WebGLRenderingContext;

    private program: WebGLProgram;
    private vertexBuffer: WebGLBuffer;
    private indexBuffer: WebGLBuffer;
    private vertexCount: number;

    private time: number = 0;

    constructor() {
        this.canvas = document.createElement('canvas');
        document.body.style.margin = '0';
        document.body.appendChild(this.canvas);
        window.addEventListener('resize', this.resizeCanvas);

        const gl = this.canvas.getContext('webgl');
        if (!gl) throw new Error('WebGL не поддерживается');
        this.gl = gl;

        this.program = createShsaderProgram(gl);
        gl.useProgram(this.program);

        gl.enable(gl.DEPTH_TEST);

        this.resizeCanvas();
        this.setupGeometry();
    }

    private setupGeometry() {
        const gl = this.gl;
        const segments = 100;
        const vertices: number[] = [];
        const indices: number[] = [];

        // Генерация uv-координат (мапа 100*100 0..2pi)
        for (let i = 0; i <= segments; i++) {
            for (let j = 0; j <= segments; j++) {
                const u = (i / segments) * 2 * Math.PI;
                const v = (j / segments) * 2 * Math.PI;
                vertices.push(u, v);
            }
        }

        // Индексы для triangles
        const vertCount = segments + 1;
        for (let i = 0; i < segments; i++) {
            for (let j = 0; j < segments; j++) {
                const a = i * vertCount + j;
                const b = a + 1;
                const c = a + vertCount;
                const d = c + 1;

                indices.push(a, b, c);
                indices.push(b, d, c);
            }
        }

        this.vertexCount = indices.length;

        this.vertexBuffer = gl.createBuffer()!;
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

        this.indexBuffer = gl.createBuffer()!;
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

        const aUV = gl.getAttribLocation(this.program, 'uv');
        gl.enableVertexAttribArray(aUV);
        gl.vertexAttribPointer(aUV, 2, gl.FLOAT, false, 0, 0);

        this.vertexCount = indices.length;
    }


    run() {
        requestAnimationFrame(this.render);
    }

    private render = () => {
        const gl = this.gl;
        this.time += 0.01;

        const morphFactor = (Math.sin(this.time) + 1) / 2;

        gl.viewport(0, 0, this.canvas.width, this.canvas.height);
        gl.clearColor(1.0, 1.0, 1.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        gl.useProgram(this.program);

        const morphLoc = gl.getUniformLocation(this.program, "morphFactor");
        gl.uniform1f(morphLoc, morphFactor);

        const aspect = this.canvas.width / this.canvas.height;
        const fov = Math.PI / 4;
        const near = 0.1;
        const far = 100;
        const f = 1.0 / Math.tan(fov / 2);

        const projectionMatrix = new Float32Array([
            f / aspect, 0, 0, 0,
            0, f, 0, 0,
            0, 0, (far + near) / (near - far), -1,
            0, 0, (2 * far * near) / (near - far), 0,
        ]);

        const viewMatrix = this.getViewMatrix();

        const projLoc = gl.getUniformLocation(this.program, "projectionMatrix");
        const viewLoc = gl.getUniformLocation(this.program, "viewMatrix");

        gl.uniformMatrix4fv(projLoc, false, projectionMatrix);
        gl.uniformMatrix4fv(viewLoc, false, viewMatrix);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);

        gl.drawElements(gl.TRIANGLES, this.vertexCount, gl.UNSIGNED_SHORT, 0);

        requestAnimationFrame(this.render);
    }

    private getViewMatrix(): Float32Array {
        const radius = 3.0;
        const angle = this.time * 0.3;

        const eyeX = radius * Math.cos(angle);
        const eyeY = radius * 0.3;
        const eyeZ = radius * Math.sin(angle);

        const up = [0, 1, 0];
        const center = [0, 0, 0];

        const zAxis = normalize(subtract([eyeX, eyeY, eyeZ], center));
        const xAxis = normalize(cross(up, zAxis));
        const yAxis = cross(zAxis, xAxis);

        return new Float32Array([
            xAxis[0], yAxis[0], zAxis[0], 0,
            xAxis[1], yAxis[1], zAxis[1], 0,
            xAxis[2], yAxis[2], zAxis[2], 0,
            -dot(xAxis, [eyeX, eyeY, eyeZ]),
            -dot(yAxis, [eyeX, eyeY, eyeZ]),
            -dot(zAxis, [eyeX, eyeY, eyeZ]),
            1,
        ]);
    }

    private resizeCanvas = () => {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
}

const subtract = (a: number[], b: number[]) =>
    a.map((v, i) => v - b[i]);
const normalize = (v: number[]) => {
    const len = Math.hypot(...v);
    return v.map((x) => x / len);
};
const cross = (a: number[], b: number[]) => [
    a[1]*b[2] - a[2]*b[1],
    a[2]*b[0] - a[0]*b[2],
    a[0]*b[1] - a[1]*b[0]
];
const dot = (a: number[], b: number[]) =>
    a.reduce((sum, v, i) => sum + v * b[i], 0);

const app = new Application();
app.run();
