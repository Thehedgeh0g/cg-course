import {mat4, vec3} from "gl-matrix";
import {Player} from "./player.ts";
import {Labyrinth} from "./labyrinth.ts";

export class PlayerControl {
    private player: Player;
    private keysUp: { [key: string]: boolean } = {}
    private labyrinth: Labyrinth;

    constructor(player: Player, labyrinth: Labyrinth) {
        this.player = player
        this.labyrinth = labyrinth
        this.setupEventListeners()
    }

    public updatePlayer(deltaTime: number) {
        if (this.keysUp['ArrowUp']) {
            this.player.moveForward(this.labyrinth, deltaTime)
        }
        if (this.keysUp['ArrowDown']) {
            this.player.moveForward(this.labyrinth, -deltaTime)
        }
        if (this.keysUp['ArrowLeft']) {
            this.player.rotate(-deltaTime)
        }
        if (this.keysUp['ArrowRight']) {
            this.player.rotate(deltaTime)
        }
    }

    public calcPlayerViewMatrix() {
        const viewMatrix = mat4.create();
        const eye = vec3.fromValues(
            this.player.position[0],
            this.player.position[1],
            this.player.position[2]
        );

        const center = vec3.fromValues(
            eye[0] + Math.cos(this.player.direction) * Math.cos(this.player.pitch),
            eye[1] + Math.sin(this.player.pitch),
            eye[2] + Math.sin(this.player.direction) * Math.cos(this.player.pitch)
        );

        const up = vec3.fromValues(0, 1, 0);
        mat4.lookAt(viewMatrix, eye, center, up);

        return viewMatrix;
    }

    private setupEventListeners() {
        window.addEventListener('keydown', this.handleKeyDown)
        window.addEventListener('keyup', this.handleKeyUp)
    }

    private handleKeyDown = (event: KeyboardEvent) => {
        this.keysUp[event.key] = true
    }

    private handleKeyUp = (event: KeyboardEvent) => {
        this.keysUp[event.key] = false
    }
}
