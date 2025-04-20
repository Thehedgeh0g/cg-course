import {mat4} from "gl-matrix";
import {Labyrinth} from "./labyrinth";

export class LabyrinthView {
    private labyrinth: Labyrinth
    private gl: WebGLRenderingContext
    private readonly uMatrixLocation: WebGLUniformLocation
    private readonly uColorLocation: WebGLUniformLocation

    public constructor(labyrinth: Labyrinth, gl: WebGLRenderingContext, uMatrixLocation: WebGLUniformLocation, uColorLocation: WebGLUniformLocation) {
        this.labyrinth = labyrinth
        this.gl = gl
        this.uColorLocation = uColorLocation
        this.uMatrixLocation = uMatrixLocation
    }

    public draw(cubeIndex: number, projectionMatrix: mat4, viewMatrix: mat4) {
        for (let z = 0; z < this.labyrinth.getSize(); z++) {
            for (let x = 0; x < this.labyrinth.getSize(); x++) {
                if (this.labyrinth.getMap()[z]![x] === 1) {
                    const mvpMatrix = this.calcMatrix(x, z, projectionMatrix, viewMatrix)
                    this.gl.uniformMatrix4fv(this.uMatrixLocation, false, mvpMatrix)
                    this.gl.uniform4fv(this.uColorLocation, [(1 - x / this.labyrinth.getSize() / 0.8), (z / this.labyrinth.getSize() / 0.8), 0.4, 2])
                    this.gl.drawElements(this.gl.TRIANGLES, cubeIndex, this.gl.UNSIGNED_SHORT, 0)
                }
            }
        }
    }

    private calcMatrix(x: number, z: number, projectionMatrix: mat4, viewMatrix: mat4): mat4 {
        const labyrinthMatrix = mat4.create()
        mat4.translate(labyrinthMatrix, labyrinthMatrix, [x, 0, z])
        const modelViewPositionMatrix = mat4.create()
        mat4.multiply(modelViewPositionMatrix, projectionMatrix, viewMatrix)
        mat4.multiply(modelViewPositionMatrix, modelViewPositionMatrix, labyrinthMatrix)
        return modelViewPositionMatrix
    }
}