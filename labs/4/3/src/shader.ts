export class Shader {
    program: WebGLProgram;

    constructor(private gl: WebGLRenderingContext, vsSrc: string, fsSrc: string) {
        const vs = this.createShader(gl.VERTEX_SHADER, vsSrc);
        const fs = this.createShader(gl.FRAGMENT_SHADER, fsSrc);
        this.program = gl.createProgram()!;
        gl.attachShader(this.program, vs);
        gl.attachShader(this.program, fs);
        gl.linkProgram(this.program);
    }

    private createShader(type: number, src: string) {
        const shader = this.gl.createShader(type)!;
        this.gl.shaderSource(shader, src);
        this.gl.compileShader(shader);
        return shader;
    }

    use() {
        this.gl.useProgram(this.program);
    }

    getAttribLocation(name: string) {
        return this.gl.getAttribLocation(this.program, name);
    }

    setUniformMat4(name: string, mat: Float32Array) {
        const loc = this.gl.getUniformLocation(this.program, name);
        this.gl.uniformMatrix4fv(loc, false, mat);
    }

    setUniformVec3(name: string, vec: [number, number, number]) {
        const loc = this.gl.getUniformLocation(this.program, name);
        this.gl.uniform3fv(loc, vec);
    }
}
