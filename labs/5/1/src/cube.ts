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
        const gl = this.gl;

        // Вершины куба с текстурными координатами
        const vertices = new Float32Array([    // Передняя грань (Z = 0)
            0, 0, 0, 0, 0, 1, 0, 0, 1, 0,
            1, 1, 0, 1, 1, 0, 1, 0, 0, 1,
            // Задняя грань (Z = 1)
            0, 0, 1, 1, 0, 1, 0, 1, 0, 0,
            1, 1, 1, 0, 1, 0, 1, 1, 1, 1,
            // Левая грань (X = 0)
            0, 0, 0, 0, 0, 0, 0, 1, 1, 0,
            0, 1, 1, 1, 1, 0, 1, 0, 0, 1,
            // Правая грань (X = 1)
            1, 0, 0, 1, 0, 1, 0, 1, 0, 0,
            1, 1, 1, 0, 1, 1, 1, 0, 1, 1,
        ]);

        const indices = new Uint16Array([
            // Передняя грань (корректная)
            4, 5, 6, 4, 6, 7,

            // Задняя грань (корректная)
            0, 2, 1, 0, 3, 2,

            // Левая грань (исправлено направление)
            0, 4, 7, 0, 7, 3,

            // Правая грань (корректная)
            1, 6, 5, 1, 2, 6,

            // Верхняя грань (исправлено направление)
            3, 7, 6, 3, 6, 2,

            // Нижняя грань (исправлено направление)
            0, 5, 4, 0, 1, 5
        ]);

        this.indexCount = indices.length;

        // Создаем и заполняем буфер вершин
        this.vertexBuffer = gl.createBuffer()!;
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

        // Создаем и заполняем индексный буфер
        this.indexBuffer = gl.createBuffer()!;
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

        // Настройка атрибутов
        const positionLocation = gl.getAttribLocation(this.program, 'a_position');
        const texcoordLocation = gl.getAttribLocation(this.program, 'a_texcoord');

        gl.enableVertexAttribArray(positionLocation);
        gl.enableVertexAttribArray(texcoordLocation);

        // Шаг в байтах между вершинами (5 значений * 4 байта)
        const stride = 5 * Float32Array.BYTES_PER_ELEMENT;

        // Настройка атрибута позиций
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        gl.vertexAttribPointer(
            positionLocation,
            3,
            gl.FLOAT,
            false,
            stride,
            0
        );

        // Настройка атрибута текстурных координат
        gl.vertexAttribPointer(
            texcoordLocation,
            2,
            gl.FLOAT,
            false,
            stride,
            3 * Float32Array.BYTES_PER_ELEMENT
        );
    }
}