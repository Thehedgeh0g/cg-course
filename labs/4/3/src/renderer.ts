import { MobiusStrip } from './mobius';
import { Camera } from './camera';

export class Renderer {
    gl: WebGLRenderingContext;

    constructor(private canvas: HTMLCanvasElement) {
        const gl = canvas.getContext('webgl');
        if (!gl) throw new Error('WebGL не поддерживается');
        this.gl = gl;

        this.resize();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    }

    render(object: MobiusStrip, camera: Camera) {
        const gl = this.gl;
        gl.enable(gl.DEPTH_TEST);
        gl.clearColor(0.05, 0.05, 0.1, 1);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        const aspect = this.canvas.width / this.canvas.height;
        const proj = camera.getProjectionMatrix(aspect);
        const view = camera.getViewMatrix();
        const eye = camera.eye;

        object.render(view, proj, eye);
    }
}
