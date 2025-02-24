import {ImageDocument} from "./ImageDocument";
import {ImageView} from "./ImageView";
import {ImageController} from "./ImageController";

function main(): void {
	const canvas = document.getElementById("canvas") as HTMLCanvasElement;

	if (canvas) {
		const document = new ImageDocument();
		const view = new ImageView(
			window.innerWidth,
			window.innerHeight,
			canvas,
			document,
		);
		document.addObserver(view);
		new ImageController(document, view);
	} else {
		console.error("Canvas element not found!");
	}
}

main();
