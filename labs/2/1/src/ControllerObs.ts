export interface IControllerObserver {
	update(image: File): void;
}

export interface IControllerObservable {
	addObserver(observer: IControllerObserver): void;

	notifyListeners(file: File): void;
}
