export class Line {
	public startPosition: {x: number; y: number};
	public endPosition: {x: number; y: number};
	public brushSize: number = 5;
	public color: string;
}

export class ImageModel {
	image: HTMLImageElement;
	x: number;
	y: number;
}

export interface IObserver {
	update(lines: Array<Line>, images: Array<ImageModel>): void;
	getName(): string;
}

export interface IObservable {
	addObserver(observer: IObserver): void;

	notifyListeners(): void;

	removeObserver(observerName: string): void;
}
