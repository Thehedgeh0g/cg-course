export class Camera {
    eye: [number, number, number] = [3, 1.5, 0];

    update(time: number) {
        const angle = time * 0.001;
        this.eye = [Math.cos(angle) * 3, 1.5, Math.sin(angle) * 3];
    }

    getViewMatrix(): Float32Array {
        const center = [0, 0, 0];
        const up = [0, 1, 0];

        const z = normalize(sub(this.eye, center));
        const x = normalize(cross(up, z));
        const y = cross(z, x);

        return new Float32Array([
            x[0], y[0], z[0], 0,
            x[1], y[1], z[1], 0,
            x[2], y[2], z[2], 0,
            -dot(x, this.eye), -dot(y, this.eye), -dot(z, this.eye), 1
        ]);
    }

    getProjectionMatrix(aspect: number): Float32Array {
        const f = 1.0 / Math.tan(Math.PI / 8);
        const near = 0.1, far = 100;

        return new Float32Array([
            f / aspect, 0, 0, 0,
            0, f, 0, 0,
            0, 0, (far + near) / (near - far), -1,
            0, 0, (2 * far * near) / (near - far), 0,
        ]);
    }
}

// Математические утилиты
function sub(a: number[], b: number[]) {
    return a.map((v, i) => v - b[i]) as [number, number, number];
}
function dot(a: number[], b: number[]) {
    return a.reduce((sum, v, i) => sum + v * b[i], 0);
}
function cross(a: number[], b: number[]) {
    return [
        a[1]*b[2] - a[2]*b[1],
        a[2]*b[0] - a[0]*b[2],
        a[0]*b[1] - a[1]*b[0]
    ] as [number, number, number];
}
function normalize(v: number[]) {
    const len = Math.sqrt(dot(v, v));
    return v.map(n => n / len) as [number, number, number];
}
