import {BaseShape} from "./Shape";
import {ObjParser} from "../Common/objConverter";

class IcosaDodecahedron extends BaseShape {
    private objParser: ObjParser

    private static readonly objText = `
    v 0.0 0.0 1.175571
    v 1.051462 0.0 0.5257311
    v 0.3249197 1.0 0.5257311
    v -0.8506508 0.618034 0.5257311
    v -0.8506508 -0.618034 0.5257311
    v 0.3249197 -1.0 0.5257311
    v 0.8506508 0.618034 -0.5257311
    v 0.8506508 -0.618034 -0.5257311
    v -0.3249197 1.0 -0.5257311
    v -1.051462 0.0 -0.5257311
    v -0.3249197 -1.0 -0.5257311
    v 0.0 0.0 -1.175571
    f 1 2 3
    f 1 3 4
    f 1 4 5
    f 1 5 6
    f 1 6 2
    f 2 6 8
    f 2 8 7
    f 2 7 3
    f 3 7 9
    f 3 9 4
    f 4 9 10
    f 4 10 5
    f 5 10 11
    f 5 11 6
    f 6 11 8
    f 7 8 12
    f 7 12 9
    f 8 11 12
    f 9 12 10
    f 10 12 11
    `;


    constructor(gl: WebGLRenderingContext, shaderProgram: WebGLProgram) {
        super(gl, shaderProgram);
    }

    protected initPositionBuffer(): WebGLBuffer {
        this.objParser = new ObjParser(IcosaDodecahedron.objText)
        const gl = this.gl;
        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

        const positions = this.objParser.vertices

        if (positions.length === 0) {
            console.error("Error: Position buffer is empty!");
        }

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
        return positionBuffer;
    }

    protected initColorBuffer(): WebGLBuffer {
        this.objParser = new ObjParser(IcosaDodecahedron.objText)
        const gl = this.gl;
        const colorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);

        const colors = this.objParser.colors

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
        return colorBuffer;
    }

    protected initIndexBuffer(): WebGLBuffer {
        this.objParser = new ObjParser(IcosaDodecahedron.objText)
        const gl = this.gl;
        const indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

        const indices = this.objParser.indices

        if (indices.length === 0) {
            console.error("Error: Index buffer is empty!");
        }

        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
        return indexBuffer;
    }
}

export {IcosaDodecahedron};