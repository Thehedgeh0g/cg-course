export interface ImageInterface {
	image: HTMLImageElement;
	x: number;
	y: number;
}

export interface IObserver {
	update(images: Array<ImageInterface>): void;
	getName(): string;
}

export interface IObservable {
	addObserver(observer: IObserver): void;

	notifyListeners(): void;

	removeObserver(observerName: string): void;
}
