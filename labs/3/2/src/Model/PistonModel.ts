import {Point} from "../Common/Common";

export class PistonModel {
	private currentPos: Point;

	constructor(startPos: Point) {
		this.currentPos = startPos;
	}

	public GetPos(): Point {
		return this.currentPos;
	}

	public UpdateCurrentPos(newPos: Point) {
		this.currentPos = newPos;
	}
}
