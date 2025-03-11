export class CrankshaftModel {
	private radius: number;
	private angle: number = 0;
	private speed: number;

	public constructor(radius: number, speed: number) {
		this.radius = radius;
		this.speed = this.calculateAngularSpeed(speed);
	}

	public GetRadius(): number {
		return this.radius;
	}

	public GetAngle(): number {
		return this.angle;
	}

	public GetSpeed(): number {
		return this.speed
	}

	public Update(diffTime: number) {
		this.angle = ( this.angle + this.speed * diffTime) / (Math.PI*2);
	}

	private calculateAngularSpeed(rpm: number): number {
		return rpm / 1000 / (Math.PI * 2);
	}
}
