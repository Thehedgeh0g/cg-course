import {ComponentInterface} from "./components/ComponentInterface";
import {SunComponent} from "./components/SunComponent";
import {CloudComponent} from "./components/CloudComponent";
import {WallComponent} from "./components/WallComponent";
import {RoofComponent} from "./components/RoofComponent";
import {ChimneyComponent} from "./components/ChimneyComponent";
import {RectWindowComponent} from "./components/RectWindowComponent";
import {DoorComponent} from "./components/DoorComponent";
import {FenceComponent} from "./components/FenceComponent";
import {SkyComponent} from "./components/SkyComponent";
import {GroundComponent} from "./components/GroundComponent";

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
	canvas.width = 800;
	canvas.height = 600;

	const components: ComponentInterface[] = [
		new SkyComponent(),
		new GroundComponent(500),
		new SunComponent(700, 100, 50),
		new CloudComponent(100, 80),
		new CloudComponent(300, 60),
		new CloudComponent(500, 90),
		new WallComponent(200, 300, 250, 300, "#FFD700"),
		new RoofComponent(250, 300, 300, 100),
		new ChimneyComponent(450, 190, 40, 80),
		new RectWindowComponent(60, 60, 270, 350),
		new RectWindowComponent(60, 60, 470, 350),
		new DoorComponent(100, 60, 370, 400),
		new FenceComponent(800, 0, 500)
	];

	components.forEach((component) => component.draw(ctx));
}

main();
