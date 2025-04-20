import {Shader} from './shader';
// @ts-ignore
import {vec3} from "gl-matrix";
//todo: использовать triangle strip
//todo: вывести формулы dx dz dy
//todo: надо трансформировать нормали
export class MobiusStrip {
    indexCount: number;
    shader: Shader;

    constructor(private gl: WebGLRenderingContext) {
        const {positions, indices, normals} = this.createGeometry(200, 0.3);

        this.shader = new Shader(gl, vertexSource, fragmentSource);

        const normalBuffer = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer)
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW)

        const posBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

        const indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

        const posLoc = this.shader.getAttribLocation('position');
        gl.enableVertexAttribArray(posLoc);
        gl.vertexAttribPointer(posLoc, 3, gl.FLOAT, false, 0, 0);

        const normalLoc = this.shader.getAttribLocation('normal');
        gl.enableVertexAttribArray(normalLoc);
        gl.vertexAttribPointer(normalLoc, 3, gl.FLOAT, false, 0, 0);

        this.indexCount = indices.length;
    }

    render(view: Float32Array, proj: Float32Array, eye: [number, number, number]) {
        const gl = this.gl;
        this.shader.use();

        this.shader.setUniformMat4('uView', view);
        this.shader.setUniformMat4('uProjection', proj);
        this.shader.setUniformVec3('uLightDir', normalize([-1, 2, 2]));
        this.shader.setUniformVec3('uViewPos', eye);

        gl.drawElements(gl.TRIANGLES, this.indexCount, gl.UNSIGNED_SHORT, 0);
    }

    createGeometry(segments: number, width: number) {
        const positions = [], indices = [];
        let normals: number[];

        for (let i = 0; i <= segments; i++) {
            const t = i / segments * 2 * Math.PI;
            for (let j = 0; j <= 1; j++) {
                const s = (j - 0.5) * width;
                const phi = t / 2;

                const x = Math.cos(t) * (1 + s * Math.cos(phi));
                const y = Math.sin(t) * (1 + s * Math.cos(phi));
                const z = s * Math.sin(phi);
                positions.push(x, y, z);
            }
        }

        for (let i = 0; i < segments; i++) {
            const i0 = i * 2;
            const i1 = i0 + 1;
            const i2 = i0 + 2;
            const i3 = i0 + 3;
            indices.push(i0, i1, i2, i2, i1, i3);
        }

        normals = this.computeNormals(segments, width)
        return {positions, indices, normals};
    }

    private computeNormals(segments: number, width: number): number[] {
        const normals: number[] = []
        const vMin = -1
        const vMax = 1

        for (let i = 0; i <= segments; i++) {
            const u = 2 * Math.PI * i / segments
            const cosU = Math.cos(u)
            const sinU = Math.sin(u)
            const cosU2 = Math.cos(u / 2)
            const sinU2 = Math.sin(u / 2)

            for (let j = 0; j <= width; j++) {
                const v = vMin + ((vMax - vMin) * j) / width

                const factor = 1 + (v / 2) * cosU2
                const dx_du = -factor * sinU - (v * sinU2 * cosU) / 4
                const dy_du = -(v * cosU2) / 4
                const dz_du = factor * cosU - (v * sinU2 * sinU) / 4

                const dFactor_dv = cosU2 / 2
                const dx_dv = dFactor_dv * cosU
                const dy_dv = -Math.sin(u / 2) / 2
                const dz_dv = dFactor_dv * sinU

                const du = vec3.fromValues(dx_du, dy_du, dz_du)
                const dv = vec3.fromValues(dx_dv, dy_dv, dz_dv)
                const normal = vec3.cross(vec3.create(), du, dv)
                vec3.normalize(normal, normal)
                normals.push(...normal)
            }
        }

        return normals
    }
}

const vertexSource = `
attribute vec3 position;
attribute vec3 normal;
uniform mat4 uView;
uniform mat4 uProjection;
uniform vec3 uLightDir;
uniform vec3 uViewPos;
varying float vLighting;

void main() {
  vec3 norm = normalize(normal);
  vec3 light = normalize(uLightDir);
  float diffuse = max(dot(norm, light), 0.0);
  vLighting = 0.3 + 0.7 * diffuse;
  gl_Position = uProjection * uView * vec4(position, 1.0);
}
`;

const fragmentSource = `
precision mediump float;     
varying float vLighting; 
void main() {
  vec3 baseColor = vec3(0.2, 0.7, 1.0);

  gl_FragColor = vec4(baseColor * vLighting, 1.0);
}
`;

function normalize(v: [number, number, number]) {
    const len = Math.sqrt(v[0] ** 2 + v[1] ** 2 + v[2] ** 2);
    return v.map(x => x / len) as [number, number, number];
}
