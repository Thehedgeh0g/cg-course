const vertexShaderSource = `
    attribute vec3 a_position;
    attribute vec2 a_texcoord;
    
    varying vec2 v_texcoord;
    uniform mat4 u_matrix;
    // varying, uniform, atribute отличия, побаловаться с фильтрацией текстур
    void main() {
        // Всегда добавляйте .0 к целым числам в GLSL
        gl_Position = u_matrix * vec4(a_position, 1.0);
        
        // Переворачиваем текстуру по вертикали (если требуется)
        v_texcoord = vec2(a_texcoord.x, 1.0 - a_texcoord.y);
    }
`

const fragmentShaderSource = `
    precision mediump float; // Должно быть в первой строке
    
    varying vec2 v_texcoord;
    uniform sampler2D u_texture;
    uniform vec4 u_color;
    
    void main() {
        vec4 texColor = texture2D(u_texture, v_texcoord);
        
        // Комбинируем цвет текстуры с uniform цветом
        gl_FragColor = texColor * u_color;
        
        // Для отладки: если альфа = 0, показываем красный
        if(gl_FragColor.a < 0.01) {
            gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
        }
    }
`

export const createShaderProgram = (gl: WebGLRenderingContext): WebGLProgram => {
    const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
    const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource)

    const program = gl.createProgram()
    if (!program) {
        throw new Error('Не удалось создать программу')
    }
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        const err = gl.getProgramInfoLog(program)
        throw new Error('Ошибка линковки программы: ' + err)
    }

    return program
}

export const loadTextureAsync = (gl: WebGLRenderingContext, url: string): Promise<WebGLTexture> => {
    return new Promise((resolve, reject) => {
        const texture = gl.createTexture();
        if (!texture) return reject(new Error('Не удалось создать текстуру'));

        const image = new Image();
        image.crossOrigin = "anonymous";

        image.onload = () => {
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

            if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
                gl.generateMipmap(gl.TEXTURE_2D);
            } else {
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            }

            resolve(texture);
        };

        image.onerror = () => reject(new Error(`Не удалось загрузить изображение: ${url}`));

        image.src = url;
    });
};

const compileShader = (gl: WebGLRenderingContext, type: number, source: string): WebGLShader => {
    const shader = gl.createShader(type)
    if (!shader) {
        throw new Error('Не удалось создать шейдер')
    }
    gl.shaderSource(shader, source)
    gl.compileShader(shader)
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const err = gl.getShaderInfoLog(shader)
        gl.deleteShader(shader)
        throw new Error('Ошибка компиляции шейдера: ' + err)
    }
    return shader
}

const isPowerOf2 = (value: number): boolean => (value & (value - 1)) === 0;
