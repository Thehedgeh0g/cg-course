import {mat4} from "gl-matrix";
import {Labyrinth} from "./labyrinth";
import {loadTexture} from "./webGLUtils"

export class LabyrinthView {
    private labyrinth: Labyrinth
    private gl: WebGLRenderingContext
    private readonly uMatrixLocation: WebGLUniformLocation
    private readonly uTextureLocation: WebGLUniformLocation
    private readonly textures: WebGLTexture[]
    private isTextureLoaded = false

    public constructor(labyrinth: Labyrinth, gl: WebGLRenderingContext, uMatrixLocation: WebGLUniformLocation, uTextureLocation: WebGLUniformLocation) {
        this.labyrinth = labyrinth
        this.gl = gl
        this.uMatrixLocation = uMatrixLocation
        this.uTextureLocation = uTextureLocation

        this.textures = [
            loadTexture(this.gl, '../textures/stone.jpg', () => {
                this.isTextureLoaded = true;
            }),
            loadTexture(this.gl, '../textures/brick.jpg', () => {
                this.isTextureLoaded = true;
            }),
            loadTexture(this.gl, '../textures/bad.jpg', () => {
                this.isTextureLoaded = true;
            }),
            loadTexture(this.gl, '../textures/concrete.jpg', () => {
                this.isTextureLoaded = true;
            }),
        ]
    }

    public draw(cubeIndex: number, projectionMatrix: mat4, viewMatrix: mat4) {
        this.gl.activeTexture(this.gl.TEXTURE0)
        this.gl.uniform1i(this.uTextureLocation, 0)
        for (let z = 0; z < this.labyrinth.getSize(); z++) {
            for (let x = 0; x < this.labyrinth.getSize(); x++) {
                if (this.labyrinth.getMap()[z]![x] === 1) {
                    const mvpMatrix = this.calcMatrix(x, z, projectionMatrix, viewMatrix)
                    this.gl.uniformMatrix4fv(this.uMatrixLocation, false, mvpMatrix)
                    this.gl.bindTexture(this.gl.TEXTURE_2D, this.textures[this.labyrinth.getTextureIndex(x, z)])
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

    private getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
}