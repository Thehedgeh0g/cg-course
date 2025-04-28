const vertexShaderSource = `
attribute float a_x;
uniform float u_aspect;

void main() {
    float x = a_x;
    float R = (1.0 + sin(x)) * 
              (1.0 + 0.9 * cos(8.0 * x)) * 
              (1.0 + 0.1 * cos(24.0 * x)) * 
              (0.5 + 0.05 * cos(140.0 * x));
              
    float newX = R * cos(x) * 0.7;
    float newY = R * sin(x) * 0.7;
    
    // Корректируем на соотношение сторон
    gl_Position = vec4(newX / u_aspect, newY-0.8, 0.0, 1.0);
}
`;

const fragmentShaderSource = `
precision mediump float;

void main() {
    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0); // белый цвет
}
`;

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
