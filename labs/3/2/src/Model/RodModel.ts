import {Point} from "../Common/Common";

export class RodModel {
	private rodStart: Point;
	private rodEnd: Point;
	private readonly length: number;
	private readonly crankshaftRadius: number;

	constructor(
		start: Point,
		end: Point,
		length: number,
		crankshaftRadius: number,
	) {
		this.rodStart = {x: start.x, y: start.y};
		this.rodEnd = {x: end.x, y: end.y};
		this.length = length;
		this.crankshaftRadius = crankshaftRadius;
	}

	public GetStart(): Point {
		return this.rodStart;
	}

	public GetEnd(): Point {
		return this.rodEnd;
	}

	public Update(time: number) {
		this.UpdateRodStartPos(time);
		this.UpdateRodEndPos();
	}

	private UpdateRodStartPos(crankshaftAngle: number) {
		this.rodStart.x = (this.crankshaftRadius) * Math.cos(crankshaftAngle - Math.PI/2);
		this.rodStart.y = (this.crankshaftRadius) * Math.sin(crankshaftAngle - Math.PI/2);
	}

	private UpdateRodEndPos() {
		this.rodEnd.y =
			this.rodStart.y +
			Math.sqrt(this.length ** 2 - this.rodStart.x ** 2);
	}
}
