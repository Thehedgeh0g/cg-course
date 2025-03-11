import {Circle} from "../Primitives/Circle";
import {Rectangle} from "../Primitives/Rectangle";
import {Point} from "../Common/Common";
import {Scene} from "three";

export class CrankshaftView {
    private circle: Circle
    private rectangle: Rectangle
    private radius: number

    constructor(center: Point, radius: number, angle: number) {
        this.radius = radius
        this.circle = new Circle(center, this.radius, 0x808080)
        let rectCenterX = Math.cos(angle+Math.PI/2)*this.radius
        let rectCenterY = Math.sin(angle+Math.PI/2)*this.radius
        this.rectangle = new Rectangle({x: rectCenterX, y: rectCenterY}, this.radius, this.radius/2, 0x808080)
        this.rectangle.Rotate(angle)
    }

    public Update(newAngle: number) {
        let rectCenterX = Math.cos(newAngle+Math.PI/2)*this.radius
        let rectCenterY = Math.sin(newAngle+Math.PI/2)*this.radius
        this.rectangle.UpdateCenter({x: rectCenterX, y: rectCenterY})
        this.rectangle.Rotate(newAngle)
    }

    public AddToScene(scene: Scene) {
        this.rectangle.AddToScene(scene)
        this.circle.AddToScene(scene)
    }
}