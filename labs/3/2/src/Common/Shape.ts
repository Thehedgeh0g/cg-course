export class Shape {
    protected angle: number = 0;
    constructor(protected x: number, protected y: number) {}

    setPosition(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    rotate(angle: number) {
        this.angle = angle;
    }

    protected rotatePoint(px: number, py: number): [number, number] {
        const cosA = Math.cos(this.angle);
        const sinA = Math.sin(this.angle);
        const dx = px - this.x;
        const dy = py - this.y;
        return [
            this.x + dx * cosA - dy * sinA,
            this.y + dx * sinA + dy * cosA
        ];
    }
}