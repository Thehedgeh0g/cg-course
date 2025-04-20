import { Renderer } from './renderer';
import { MobiusStrip } from './mobius';
import { Camera } from './camera';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const renderer = new Renderer(canvas);
const camera = new Camera();
const mobius = new MobiusStrip(renderer.gl);

function animate(time: number) {
    camera.update(time);
    renderer.render(mobius, camera);
    requestAnimationFrame(animate);
}
animate(0);
