export interface IControllerObserver {
	update(image: File | null, brushSize: number, color: string): void;
}

export interface IControllerObservable {
	addObserver(observer: IControllerObserver): void;

	notifyListeners(file: File | null, brushSize: number, color: string): void;
}
