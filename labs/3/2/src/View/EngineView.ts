import {EngineModel} from "../Model/EngineModel";
import {CrankshaftView} from "./CrankshaftView";
import {RodView} from "./RodView";
import {PistonView} from "./PistonView";
import {Point} from "../Common/Common";
import {Scene} from "three";
import {ValveView} from "./ValveView";

export class EngineView {
    private engineModel: EngineModel
    private crankshaftView: CrankshaftView
    private rodView: RodView
    private pistonView: PistonView
    private intakeValveView: ValveView
    private exhaustValveView: ValveView

    constructor(carterPos: Point, rodLength: number, crankshaftRadius: number, startRpm: number) {
        this.engineModel = new EngineModel(carterPos, rodLength, crankshaftRadius, startRpm)
        this.crankshaftView = new CrankshaftView(carterPos, crankshaftRadius, this.engineModel.GetCrankshaftAngle())
        let rodPoints = this.engineModel.GetRodPosition()
        this.rodView = new RodView(rodPoints[0], rodPoints[1])
        this.pistonView = new PistonView(crankshaftRadius, crankshaftRadius*2, this.engineModel.GetPistonPosition())
        let intakeValvePoints = this.engineModel.GetIntakeValvePosition()
        this.intakeValveView = new ValveView(intakeValvePoints[0], intakeValvePoints[1])
        let exhaustValvePoints = this.engineModel.GetExhaustValvePosition()
        this.exhaustValveView = new ValveView(exhaustValvePoints[0], exhaustValvePoints[1])
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
    }

    public AddToScene(scene: Scene) {
        this.crankshaftView.AddToScene(scene)
        this.rodView.AddToScene(scene)
        this.pistonView.AddToScene(scene)
        this.intakeValveView.AddToScene(scene)
        this.exhaustValveView.AddToScene(scene)
    }

}