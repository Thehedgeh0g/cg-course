import {Letter} from "./Letter";
import {ILetterStrategy} from "./strategies/ILetterStrategy";
import {LLetterStrategy} from "./strategies/LLetterStrategy";
import {ZLetterStrategy} from "./strategies/ZLetterStrategy";

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

	const letters: Letter[] = [
		new Letter(new ILetterStrategy(), 200, "red", 200, Date.now(), 0),
		new Letter(new LLetterStrategy(), 300, "green", 200, Date.now(), 1),
		new Letter(new ZLetterStrategy(), 400, "blue", 200, Date.now(), 2),
	];

	function animate() {
		if (!ctx) {
			console.error("2D context not found");
			return;
		}

		ctx.clearRect(0, 0, canvas.width, canvas.height);

		letters.forEach((letter) => {
			letter.draw(ctx, Date.now());
		});

		requestAnimationFrame(animate);
	}

	animate();
}

main();
