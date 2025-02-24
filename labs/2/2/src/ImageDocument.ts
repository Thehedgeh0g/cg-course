import {ImageModel, IObservable, IObserver, Line} from "./image";
import {IControllerObservable, IControllerObserver} from "./ControllerObs";

export class ImageDocument implements IObservable {
	private readonly INIT_POSITION_X = 0;
	private readonly INIT_POSITION_Y = 0;
	private width: number = 0;
	private height: number = 0;
	private brushSize: number = 5;
	private currentColor: string = "#000000";
	private images: Array<ImageModel> = [];
	private lines: Array<Line> = [];
	private isDrawing: boolean = false;
	private anythingDraw: boolean = false;
	private observers: Array<IObserver> = [];

	constructor(width: number, height: number) {
		this.width = width;
		this.height = height;
	}

	public changeBrushSize(newBrushSize: number): void {
		this.brushSize = newBrushSize;
	}

	public addImage(file: File): void {
		const reader = new FileReader();
		reader.onload = (event) => {
			const image = new Image();
			image.src = event.target?.result as string;
			image.onload = () => {
				this.images.push({image: image, x: 0, y: 0});
				this.notifyListeners();
			};
		};
		reader.readAsDataURL(file);
	}

	public startDrawing(x: number, y: number): void {
		this.isDrawing = true;
		let newline = new Line();
		newline.brushSize = this.brushSize;
		newline.startPosition = {x: x, y: y};
		newline.endPosition = {x: x, y: y};
		newline.color = this.currentColor;
		this.lines.push(newline);
		console.log(this.lines);
	}

	public drawLine(x: number, y: number): void {
		if (this.isDrawing) {
			this.lines[this.lines.length - 1].endPosition.x = x;
			this.lines[this.lines.length - 1].endPosition.y = y;
			this.lines[this.lines.length - 1].color = this.currentColor;
			this.anythingDraw = true;
			this.notifyListeners();
		}
	}

	public stopDrawing(): void {
		this.isDrawing = false;
		if (!this.anythingDraw) {
			this.lines.pop();
		}
		this.anythingDraw = false;
		this.notifyListeners();
	}

	public isDrawingNow(): boolean {
		return this.isDrawing;
	}

	public getWidth(): number {
		return this.width;
	}

	public getHeight(): number {
		return this.height;
	}

	public getInitX(): number {
		return this.INIT_POSITION_X;
	}

	public getInitY(): number {
		return this.INIT_POSITION_Y;
	}

	public changeColor(color: string): void {
		this.currentColor = color;
	}

	public addObserver(observer: IObserver) {
		this.observers.push(observer);
	}

	public notifyListeners(): void {
		this.observers.forEach((observer) =>
			observer.update(this.lines, this.images),
		);
	}

	public removeObserver(observerName: string) {
		for (let i = 0; i < this.observers.length; i++) {
			if (this.observers[i].getName() === observerName) {
				this.observers.splice(i, 1);
			}
		}
	}
}
