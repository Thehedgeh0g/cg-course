export class Labyrinth {
    private wallHeigth: number = 1
    private size: number
    private map: number[][] = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
        [1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 1, 0, 1],
        [1, 0, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1],
        [1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
        [1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1],
        [1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1],
        [1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1],
        [1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
        [1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1],
        [1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
        [1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ]

    public constructor(size: number | null) {
        if (size !== null){
            this.size = size
            this.map = this.generateRandomMatrix(this.size)
        }
        this.size = this.map.length
    }

    public getMap(): number[][] {
        return this.map
    }

    public getSize(): number {
        return this.size
    }

    public isWall(x: number, y: number, z: number): boolean {
        if (Math.abs(y) > this.wallHeigth) {
            return false
        }

        const mapX = Math.floor(x)
        const mapZ = Math.floor(z)
        return this.map[mapZ]?.[mapX] === 1
    }

    public getTextureIndex(x: number, z: number): number {
        const n = this.getSize(); // допустим, 5
        const value = Math.floor(((x + z) / (2 * (n - 1))) * 5); // 0..4
        return Math.min(value, 4); // на всякий случай
    }

    private generateRandomMatrix(N: number): number[][] {
        const matrix: number[][] = [];

        for (let i = 0; i < N; i++) {
            const row: number[] = [];
            for (let j = 0; j < N; j++) {
                row.push(Math.random() < 0.5 ? 0 : 1);
            }
            matrix.push(row);
        }

        return matrix;
    }
}