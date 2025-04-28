const vertexShaderSource = `
attribute vec3 position;

void main() {
    gl_Position = vec4(position, 1.0);
}
`;

const fragmentShaderSource = `
precision mediump float;

uniform vec2 u_center;

void main() {
    float radius = 0.5;
    float thickness = 0.025;
    vec2 c = u_center; 
    float dist = distance(c, gl_FragCoord.xy / 400.0);

    if (dist > radius - thickness && dist < radius + thickness) {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); 
    } else if (dist < radius) {
        gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
    } else {
        discard;
    }
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
