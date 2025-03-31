import {RodModel} from "./RodModel";
import {CrankshaftModel} from "./CrankshaftModel";
import {PistonModel} from "./PistonModel";
import {Point} from "../Common/Common";
import {ValveModel} from "./ValveModel";

export class EngineModel {
	private rod: RodModel;
	private crankshaft: CrankshaftModel;
	private piston: PistonModel;
	private currentStroke: number;
	private intakeValve: ValveModel
	private exhaustValve: ValveModel

	constructor(
		carterPos: Point,
		rodLength: number,
		crankshaftRadius: number,
		startRpm: number,
	) {
		let rodEndPos = {x: carterPos.x, y: carterPos.y + rodLength};
		this.crankshaft = new CrankshaftModel(crankshaftRadius, startRpm);
		this.rod = new RodModel(
			{x: carterPos.x, y:carterPos.y},
			rodEndPos,
			rodLength,
			crankshaftRadius,
		);
		this.piston = new PistonModel(rodEndPos);
		this.intakeValve = new ValveModel(
			{x: carterPos.x - crankshaftRadius, y: carterPos.x + rodLength + crankshaftRadius*1.5},
			{x: carterPos.x - crankshaftRadius-2, y: carterPos.x + rodLength + crankshaftRadius*1.5+2},
			Math.PI/4
		)
		this.exhaustValve = new ValveModel(
			{x: carterPos.x + crankshaftRadius, y: carterPos.x + rodLength + crankshaftRadius*1.5},
			{x: carterPos.x + crankshaftRadius+2, y: carterPos.x + rodLength + crankshaftRadius*1.5+2},
			Math.PI/4*3,
			false
		)
	}

	public Update(diffTime: number) {
		this.crankshaft.Update(diffTime);
		this.rod.Update(this.crankshaft.GetAngle());
		this.piston.UpdateCurrentPos(this.rod.GetEnd());
		this.intakeValve.Update(this.crankshaft.GetAngle(), this.crankshaft.GetSpeed())
		this.exhaustValve.Update(this.crankshaft.GetAngle(), this.crankshaft.GetSpeed())
		this.updateStroke();
	}

	public GetRodPosition(): Point[] {
		return [this.rod.GetStart(), this.rod.GetEnd()]
	}

	public GetIntakeValvePosition(): Point[] {
		return [this.intakeValve.GetStart(), this.intakeValve.GetEnd()]
	}

	public GetExhaustValvePosition(): Point[] {
		return [this.exhaustValve.GetStart(), this.exhaustValve.GetEnd()]
	}

	public GetPistonPosition(): Point {
		return this.piston.GetPos()
	}

	public GetCrankshaftAngle(): number {
		return this.crankshaft.GetAngle()
	}

	private updateStroke() {
		if (this.crankshaft.GetAngle() % Math.PI) {
			this.currentStroke += 1;
		}
		if (this.currentStroke === 4) {
			this.currentStroke = 0;
		}
	}
}
