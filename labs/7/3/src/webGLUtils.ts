export const vertexShaderSource = `
attribute vec2 uv;
uniform float morphFactor;
uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;

varying vec3 vNormal;

vec3 getTorus(float u, float v) {
    float R = 1.0;
    float r = 0.4;
    return vec3(
        (R + r * cos(v)) * cos(u),
        (R + r * cos(v)) * sin(u),
        r * sin(v)
    );
}

vec3 getTorusNormal(float u, float v) {
    return normalize(vec3(
        cos(u) * cos(v),
        sin(u) * cos(v),
        sin(v)
    ));
}

vec3 getSphere(float u, float v) {
    float radius = 1.0;
    return vec3(
        radius * sin(v) * cos(u),
        radius * sin(v) * sin(u),
        radius * cos(v)
    );
}

vec3 getSphereNormal(float u, float v) {
    return normalize(getSphere(u, v));
}

void main() {
    float u = uv.x;
    float v = uv.y;

    vec3 posTorus = getTorus(u, v);
    vec3 posSphere = getSphere(u, v);
    vec3 pos = mix(posTorus, posSphere, morphFactor);

    vec3 normalTorus = getTorusNormal(u, v);
    vec3 normalSphere = getSphereNormal(u, v);
    vNormal = normalize(mix(normalTorus, normalSphere, morphFactor));

    gl_Position = projectionMatrix * viewMatrix * vec4(pos, 1.0);
}
`;

export const fragmentShaderSource = `
precision mediump float;

varying vec3 vNormal;

void main() {
    vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0));
    float diff = max(dot(vNormal, lightDir), 0.0);
    vec3 baseColor = vec3(0.2, 0.6, 1.0);
    gl_FragColor = vec4(baseColor * diff, 1.0);
}
`;
export const createShaderProgram = (gl: WebGLRenderingContext): WebGLProgram => {
    const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

    const program = gl.createProgram();
    if (!program) throw new Error('Не удалось создать программу');

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        throw new Error('Ошибка линковки программы: ' + gl.getProgramInfoLog(program));
    }

    return program;
};

const compileShader = (gl: WebGLRenderingContext, type: number, source: string): WebGLShader => {
    const shader = gl.createShader(type);
    if (!shader) throw new Error('Не удалось создать шейдер');

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const err = gl.getShaderInfoLog(shader);
        gl.deleteShader(shader);
        throw new Error('Ошибка компиляции шейдера: ' + err);
    }

    return shader;
};
