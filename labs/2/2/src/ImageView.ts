import {ImageModel, IObserver, Line} from "./image";
import {IControllerObservable, IControllerObserver} from "./ControllerObs";
import {ImageDocument} from "./ImageDocument";

export class ImageView implements IObserver, IControllerObservable {
	public readonly width: number;
	public readonly height: number;
	public readonly canvas: HTMLCanvasElement;
	private imageDocument: ImageDocument;
	private ctx: CanvasRenderingContext2D;
	private name: string;
	private controller: IControllerObserver;
	private openFileButton: HTMLButtonElement;
	private changeBrushSizeInput: HTMLInputElement;
	private changeColorInput: HTMLInputElement;
	private saveButton: HTMLButtonElement;
	private brushSize: number;
	private color: string;

	constructor(
		width: number,
		height: number,
		canvas: HTMLCanvasElement,
		imageDocument: ImageDocument,
	) {
		this.width = width;
		this.height = height;
		this.canvas = canvas;
		this.ctx = this.canvas.getContext("2d")!;
		this.imageDocument = imageDocument;

		this.openFileButton = document.getElementById(
			"openFileButton",
		) as HTMLButtonElement;

		this.changeBrushSizeInput = document.getElementById(
			"brushSize",
		) as HTMLInputElement;

		this.changeColorInput = document.getElementById(
			"color",
		) as HTMLInputElement;

		this.setupCanvas();

		this.openFileButton.addEventListener("click", () => {
			this.openFileDialog();
		});

		this.changeBrushSizeInput.addEventListener("change", () => {
			this.brushSize = this.changeBrushSizeInput.valueAsNumber;
			this.notifyListeners(null, this.brushSize, this.color);
		});

		this.changeColorInput.addEventListener("change", () => {
			this.color = this.changeColorInput.value;
			this.notifyListeners(null, this.brushSize, this.color);
		});

		this.saveButton = document.getElementById(
			"saveFileButton",
		) as HTMLButtonElement;

		this.saveButton.addEventListener("click", () => {
			const name = prompt("Enter name file:");
			this.saveImage(name);
		});

		this.render();
	}

	private saveImage(name: string): void {
		const canvas = document.createElement("canvas");
		const ctx = canvas.getContext("2d")!;
		canvas.width = this.imageDocument.getWidth();
		canvas.height = this.imageDocument.getHeight();

		ctx.drawImage(
			this.canvas,
			this.imageDocument.getInitX(),
			this.imageDocument.getInitY(),
			this.imageDocument.getWidth(),
			this.imageDocument.getHeight(),
			0,
			0,
			this.imageDocument.getWidth(),
			this.imageDocument.getHeight(),
		);

		const link = document.createElement("a");
		link.download = `${name}.png`;
		link.href = canvas.toDataURL(`image/png`);
		link.click();
	}

	public getCanvas(): HTMLCanvasElement {
		return this.canvas;
	}

	public render(): void {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

	public getName(): string {
		return this.name;
	}

	private renderLines(line: Line): void {
		this.ctx.lineCap = "round";
		this.ctx.strokeStyle = line.color;
		console.log(line.color);
		this.ctx.lineWidth = line.brushSize;
		this.ctx.beginPath();
		this.ctx.moveTo(line.endPosition.x, line.endPosition.y);
		this.ctx.lineTo(line.startPosition.x, line.startPosition.y);
		this.ctx.stroke();
	}

	public openFileDialog(): void {
		const input = document.createElement("input");
		input.type = "file";
		input.accept = ".png,.jpg,.jpeg,.bmp";
		input.onchange = (e) => {
			const file = (e.target as HTMLInputElement).files?.[0];
			if (file) {
				this.notifyListeners(file, this.brushSize, this.color);
			}
		};
		input.click();
	}

	public update(lines: Array<Line>, images: Array<ImageModel>): void {
		this.render();
		console.log(lines);
		images.forEach((img) => this.ctx.drawImage(img.image, img.x, img.y));
		lines.forEach((line) => {
			this.renderLines(line);
		});
	}

	addObserver(observer: IControllerObserver): void {
		this.controller = observer;
	}

	notifyListeners(file: File | null, brushSize: number, color: string): void {
		this.controller.update(file, brushSize, color);
	}

	private setupCanvas(): void {
		this.canvas.width = this.width;
		this.canvas.height = this.height;
		window.addEventListener("resize", () => {
			this.canvas.width = this.width;
			this.canvas.height = this.height;
			this.render();
		});
	}
}
