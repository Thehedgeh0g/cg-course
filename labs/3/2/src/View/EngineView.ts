import {EngineModel} from "../Model/EngineModel";
import {CrankshaftView} from "./CrankshaftView";
import {RodView} from "./RodView";
import {PistonView} from "./PistonView";
import {Point} from "../Common/Common";
import {ValveView} from "./ValveView";
import {WebGLRenderer} from "../Common/WebGLRenderer";

export class EngineView {
    private engineModel: EngineModel
    private crankshaftView: CrankshaftView
    private rodView: RodView
    private pistonView: PistonView
    private intakeValveView: ValveView
    private exhaustValveView: ValveView

    constructor(context: WebGLRenderer, carterPos: Point, rodLength: number, crankshaftRadius: number, startRpm: number) {
        this.engineModel = new EngineModel(carterPos, rodLength, crankshaftRadius, startRpm)
        this.crankshaftView = new CrankshaftView(context, carterPos, crankshaftRadius, this.engineModel.GetCrankshaftAngle())
        let rodPoints = this.engineModel.GetRodPosition()
        this.rodView = new RodView(context, rodPoints[0], rodPoints[1])
        this.pistonView = new PistonView(context, crankshaftRadius, crankshaftRadius*2, this.engineModel.GetPistonPosition())
        let intakeValvePoints = this.engineModel.GetIntakeValvePosition()
        this.intakeValveView = new ValveView(context, intakeValvePoints[0], intakeValvePoints[1])
        let exhaustValvePoints = this.engineModel.GetExhaustValvePosition()
        this.exhaustValveView = new ValveView(context, exhaustValvePoints[0], exhaustValvePoints[1])
    }

    public Update(diffTime: number) {
        this.engineModel.Update(diffTime)
        let rodPoints = this.engineModel.GetRodPosition()
        this.pistonView.UpdatePos(rodPoints[1])
        this.crankshaftView.Update(this.engineModel.GetCrankshaftAngle())
        rodPoints = this.engineModel.GetRodPosition()
        this.rodView.Update(rodPoints[0], rodPoints[1])
        let intakeValvePoints = this.engineModel.GetIntakeValvePosition()
        let exhaustValvePoints = this.engineModel.GetExhaustValvePosition()
        this.intakeValveView.Update(intakeValvePoints[0], intakeValvePoints[1])
        this.exhaustValveView.Update(exhaustValvePoints[0], exhaustValvePoints[1])
        this.Draw()
    }

    public Draw() {
        this.crankshaftView.Draw()
        this.rodView.Draw()
        this.pistonView.Draw()
        this.intakeValveView.Draw()
        this.exhaustValveView.Draw()
    }

}