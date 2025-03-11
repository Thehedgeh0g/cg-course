import * as THREE from "three";
import {Point} from "../Common/Common";
import {Color} from "three";

export class Circle {
    public circle: THREE.Mesh;

    constructor(center: Point, radius: number, color: number = 0x0000ff) {
        const geometry = new THREE.CircleGeometry(radius, 32);

        const material = new THREE.MeshBasicMaterial({
            color: color,
            side: THREE.DoubleSide,
        });

        this.circle = new THREE.Mesh(geometry, material);

        this.circle.position.set(center.x, center.y, 0);
    }

    public UpdateCenter(center: Point) {
        this.circle.position.set(center.x, center.y, 0);
    }

    public UpdateRadius(radius: number) {
        const geometry = new THREE.CircleGeometry(radius, 32);

        this.circle.geometry.dispose();
        this.circle.geometry = geometry;
    }

    public AddToScene(scene: THREE.Scene) {
        scene.add(this.circle);
    }
}
