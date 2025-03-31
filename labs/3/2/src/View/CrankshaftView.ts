import {Circle} from "../Primitives/Circle";
import {Rectangle} from "../Primitives/Rectangle";
import {Point} from "../Common/Common";
import {WebGLRenderer} from "../Common/WebGLRenderer";
import {c} from "vite/dist/node/moduleRunnerTransport.d-CXw_Ws6P";

export class CrankshaftView {
    private circle: Circle
    private rectangle: Rectangle
    private radius: number
    private context: WebGLRenderer
    private center: Point
    private prevAngle: number

    constructor(context: WebGLRenderer, center: Point, radius: number, angle: number) {
        this.center = {x: center.x, y: center.y}
        this.context = context
        this.radius = radius
        this.circle = new Circle(center.x, center.y, radius)
        this.rectangle = new Rectangle(center.x+this.radius/2, center.y+this.radius/4, this.radius, this.radius/2)
    }

    public Update(newAngle: number) {
        let rectCenterX = this.center.x + Math.cos(newAngle+Math.PI/2)*this.radius
        let rectCenterY = this.center.y + Math.sin(newAngle+Math.PI/2)*this.radius
        this.rectangle.rotate(newAngle)
        this.prevAngle = newAngle
        this.rectangle.setPosition(rectCenterX, rectCenterY)
    }

    public Draw() {
        this.rectangle.draw(this.context, [0.5, 0.5, 0.5, 1])
        this.circle.draw(this.context, [0.5, 0.5, 0.5, 1])
    }
}