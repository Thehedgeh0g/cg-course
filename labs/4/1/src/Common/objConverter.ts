export class ObjParser {
    vertices: number[] = [];
    indices: number[] = [];
    colors: number[] = [];

    constructor(objData: string) {
        this.parse(objData);
    }

    private parse(objData: string) {
        const vertexMap: number[][] = [];
        const faceMap: number[][] = [];

        const lines = objData.split('\n');
        for (const line of lines) {
            const parts = line.trim().split(/\s+/);
            if (parts.length === 0) continue;

            switch (parts[0]) {
                case 'v':
                    const vertex = parts.slice(1).map(Number);
                    this.vertices.push(...vertex);
                    break;
                case 'f':
                    const face = parts.slice(1).map(p => parseInt(p) - 1);
                    faceMap.push(face);
                    this.indices.push(...face)
                    this.colors.push(...[Math.random(), Math.random(), Math.random(), 1]);
                    break;
            }
        }
        console.log(this.colors)
        console.log(this.indices)
        console.log(this.vertices)
    }
}
