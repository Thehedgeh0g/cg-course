import {ImageInterface, IObservable, IObserver} from "./image";

export class ImageDocument implements IObservable {
	private images: Array<ImageInterface> = [];
	private isDragging: boolean = false;
	private lastDraggingPosition: {x: number; y: number} = {x: 0, y: 0};
	private draggedIndex: number | null = null;
	private observers: Array<IObserver> = [];

	public addImage(file: File) {
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

	public startDragging(x: number, y: number): void {
		for (let i = 0; i < this.images.length; i++) {
			const image = this.images[i];
			const height = image.image.height;
			const width = image.image.width;

			if (
				x >= image.x &&
				x <= image.x + width &&
				y >= image.y &&
				y <= image.y + height
			) {
				this.isDragging = true;
				this.draggedIndex = i;
				this.lastDraggingPosition = {x: x, y: y};
				break;
			}
		}
	}

	public dragImage(x: number, y: number): void {
		if (this.isDragging && this.draggedIndex !== null) {
			this.images[this.draggedIndex].x += x - this.lastDraggingPosition.x;
			this.images[this.draggedIndex].y += y - this.lastDraggingPosition.y;
			this.lastDraggingPosition.x = x;
			this.lastDraggingPosition.y = y;
			this.notifyListeners();
		}
	}

	public stopDragging(): void {
		this.isDragging = false;
		this.draggedIndex = null;
		this.notifyListeners();
	}

	public isAnyImageDragging(): boolean {
		return this.isDragging;
	}

	public addObserver(observer: IObserver) {
		this.observers.push(observer);
	}

	public removeObserver(observerName: string) {
		for (let i = 0; i < this.observers.length; i++) {
			if (this.observers[i].getName() === observerName) {
				this.observers.splice(i, 1);
			}
		}
	}

	public notifyListeners(): void {
		this.observers.forEach((observer) => observer.update(this.images));
	}
}
