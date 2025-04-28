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
    private wallMap: number[][] = []

    public constructor(wallTypeCount: number | null) {
        this.size = this.map.length
        this.generateWallMatrix(wallTypeCount)
    }

    public getMap(): number[][] {
        return this.map
    }

    public getSize(): number {
        return this.size
    }

    public isWall(x: number, z: number): boolean {
        const buffer = 0.15;

        const positions = [
            [x + buffer, z],
            [x - buffer, z],
            [x, z + buffer],
            [x, z - buffer],
            [x + buffer, z + buffer],
            [x - buffer, z - buffer],
            [x + buffer, z - buffer],
            [x - buffer, z + buffer]
        ];

        return positions.some(([checkX, checkZ]) => {
            const gridX = Math.floor(checkX);
            const gridZ = Math.floor(checkZ);
            return this.map[gridZ]?.[gridX] !== 0;
        });
    }

    public getTextureType(x: number, z: number): number {
        return this.wallMap[x][z]
    }

    private generateTextureType(textureTypesRange: number): number {
        return Math.floor(Math.random() * textureTypesRange);
    }

    private generateWallMatrix(textureTypesRange: number) {
        for (let i = 0; i < this.size; i++) {
            const row: number[] = [];
            for (let j = 0; j < this.size; j++) {
                row.push(this.generateTextureType(textureTypesRange));
            }
            this.wallMap.push(row);
        }
    }
}