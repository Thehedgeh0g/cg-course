import {Image, Point} from "./Image";
import {Drawer} from "./Drawer";

function main(): void {
	const canvas = document.getElementById("canvas") as HTMLCanvasElement;
	if (!canvas) {
		console.error("Canvas not found!");
		return;
	}

	const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");
	if (!ctx) {
		console.error("2D context not found");
		return;
	}

	function draw() {
		if (!ctx) {
			console.error("2D context not found");
			return;
		}

		ctx.clearRect(0, 0, canvas.width, canvas.height);
		let center = new Point();
		center.x = 100;
		center.y = 100;
		let image = new Image(ctx);
		let drawer = Drawer;
		drawer.drawFilledEllipse(
			image,
			{x: 400, y: 400},
			200,
			100,
			"blue",
			"red",
		);
	}

	draw();
}

main();
