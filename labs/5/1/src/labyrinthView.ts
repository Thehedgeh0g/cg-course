import {mat4} from "gl-matrix";
import {Labyrinth} from "./labyrinth";
import {loadTextureAsync} from "./webGLUtils";

export class LabyrinthView {
    private labyrinth: Labyrinth;
    private gl: WebGLRenderingContext;
    private readonly uMatrixLocation: WebGLUniformLocation;
    private readonly uTextureLocation: WebGLUniformLocation;
    private textures: WebGLTexture[] = [];
    private texturesLoaded = false;

    public constructor(
        labyrinth: Labyrinth,
        texturePaths: string[],
        gl: WebGLRenderingContext,
        uMatrixLocation: WebGLUniformLocation,
        uTextureLocation: WebGLUniformLocation
    ) {
        this.labyrinth = labyrinth;
        this.gl = gl;
        this.uMatrixLocation = uMatrixLocation;
        this.uTextureLocation = uTextureLocation;

        this.loadTextures(texturePaths);
    }

    public draw(cubeIndex: number, projectionMatrix: mat4, viewMatrix: mat4) {
        if (!this.texturesLoaded) {
            return;
        }

        this.gl.activeTexture(this.gl.TEXTURE0);
        this.gl.uniform1i(this.uTextureLocation, 0);

        for (let z = 0; z < this.labyrinth.getSize(); z++) {
            for (let x = 0; x < this.labyrinth.getSize(); x++) {
                if (this.labyrinth.getMap()[z]![x] === 1) {
                    const mvpMatrix = this.calcMatrix(x, z, projectionMatrix, viewMatrix);
                    this.gl.uniformMatrix4fv(this.uMatrixLocation, false, mvpMatrix);

                    const texture = this.textures[this.labyrinth.getTextureType(x, z)];
                    this.gl.bindTexture(this.gl.TEXTURE_2D, texture);

                    this.gl.drawElements(this.gl.TRIANGLES, cubeIndex, this.gl.UNSIGNED_SHORT, 0);
                }
            }
        }
    }

    private async loadTextures(texturePaths) {
        const promises = texturePaths.map(path => loadTextureAsync(this.gl, path));
        this.textures = await Promise.all(promises);
        this.texturesLoaded = true;
        console.log('Все текстуры загружены');
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