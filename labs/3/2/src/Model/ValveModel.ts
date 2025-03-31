import {Point} from "../Common/Common";

export class ValveModel {
	private valveStart: Point;
	private valveEnd: Point;
	private readonly angle: number;
	private isIntake: boolean;

	constructor(
		start: Point,
		end: Point,
		angle: number,
		isIntake: boolean = true
	) {
		this.valveStart = start;
		this.valveEnd = end;
		this.angle = angle
		this.isIntake = isIntake
	}

	public GetStart(): Point {
		return this.valveStart;
	}

	public GetEnd(): Point {
		return this.valveEnd;
	}

	public Update(crankshaftAngle: number, crankshaftSpeed: number) {
		let inCycleAngle = crankshaftAngle % (4*Math.PI) - Math.PI/2
		if ((Math.PI/2 < inCycleAngle) && (inCycleAngle <= Math.PI))
		{
			this.valveStart.x += Math.cos(this.angle)*(this.valveStart.x+crankshaftSpeed/100)/1000
			this.valveEnd.x += Math.cos(this.angle)*(this.valveEnd.x+crankshaftSpeed/100)/1000
			this.valveStart.y -= Math.sin(this.angle)*(this.valveStart.y+crankshaftSpeed/100)/1000
			this.valveEnd.y -= Math.sin(this.angle)*(this.valveEnd.y+crankshaftSpeed/100)/1000
		}

		if ((Math.PI < inCycleAngle) && (inCycleAngle <= 3*Math.PI/2))
		{
			this.valveStart.x -= Math.cos(this.angle)*(this.valveStart.x+crankshaftSpeed/100)/1000
			this.valveEnd.x -= Math.cos(this.angle)*(this.valveEnd.x+crankshaftSpeed/100)/1000
			this.valveStart.y += Math.sin(this.angle)*(this.valveStart.y+crankshaftSpeed/100)/1000
			this.valveEnd.y += Math.sin(this.angle)*(this.valveEnd.y+crankshaftSpeed/100)/1000
		}

		if (this.isIntake) {
			return
		}
		if ((7*Math.PI/2 < inCycleAngle) && (inCycleAngle <= 4*Math.PI)){
			this.valveStart.x += Math.cos(this.angle)*(this.valveStart.x+crankshaftSpeed/100)/1000
			this.valveEnd.x += Math.cos(this.angle)*(this.valveEnd.x+crankshaftSpeed/100)/1000
			this.valveStart.y -= Math.sin(this.angle)*(this.valveStart.y+crankshaftSpeed/100)/1000
			this.valveEnd.y -= Math.sin(this.angle)*(this.valveEnd.y+crankshaftSpeed/100)/1000
		}

		if ((0 < inCycleAngle) && (inCycleAngle <= Math.PI/2)) {
			this.valveStart.x -= Math.cos(this.angle)*(this.valveStart.x+crankshaftSpeed/100)/1000
			this.valveEnd.x -= Math.cos(this.angle)*(this.valveEnd.x+crankshaftSpeed/100)/1000
			this.valveStart.y += Math.sin(this.angle)*(this.valveStart.y+crankshaftSpeed/100)/1000
			this.valveEnd.y += Math.sin(this.angle)*(this.valveEnd.y+crankshaftSpeed/100)/1000
		}
	}
}
