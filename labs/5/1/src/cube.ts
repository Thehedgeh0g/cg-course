export class Cube {
    private vertexBuffer: WebGLBuffer
    private indexBuffer: WebGLBuffer
    private indexCount: number
    private readonly gl: WebGLRenderingContext
    private readonly program: WebGLProgram

    public constructor(gl: WebGLRenderingContext, program: WebGLProgram) {
        this.gl = gl
        this.program = program
        this.initBuffers()
    }

    public getIndicesCount(): number {
        return this.indexCount
    }

    private initBuffers(): void {
        const gl = this.gl
        const vertices = new Float32Array([
            0, 0, 0,   1, 0, 0,   1, 1, 0,   0, 1, 0,
            0, 0, 1,   1, 0, 1,   1, 1, 1,   0, 1, 1,
        ])
        const indices = new Uint16Array([
            4, 5, 6, 4, 6, 7,  // Передняя грань
            0, 2, 1, 0, 3, 2,  // Задняя грань
            0, 7, 3, 0, 4, 7,  // Левая грань
            1, 2, 6, 1, 6, 5,  // Правая грань
            3, 6, 2, 3, 7, 6,  // Верхняя грань
            0, 1, 5, 0, 5, 4,  // Нижняя грань
        ])
        this.indexCount = indices.length

        this.vertexBuffer = gl.createBuffer()!
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer)
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)

        this.indexBuffer = gl.createBuffer()!
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer)
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW)

        const aPositionLocation = gl.getAttribLocation(this.program, 'a_position')
        if (aPositionLocation === -1) {
            throw new Error('Атрибут "a_position" не найден')
        }
        gl.enableVertexAttribArray(aPositionLocation)
        gl.vertexAttribPointer(aPositionLocation, 3, gl.FLOAT, false, 0, 0)
    }
}