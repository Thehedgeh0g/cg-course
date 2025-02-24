import {ImageDocument} from "./ImageDocument";
import {IControllerObserver} from "./ControllerObs";
import {ImageView} from "./ImageView";

export class ImageController implements IControllerObserver {
	private model: ImageDocument;
	private view: ImageView;

	constructor(model: ImageDocument, view: ImageView) {
		this.model = model;
		this.view = view;
		this.view.addObserver(this);
		this.view.getCanvas().addEventListener("mousedown", (e) => {
			const rect = this.view.getCanvas().getBoundingClientRect();
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;
			this.model.startDragging(x, y);
		});

		this.view.getCanvas().addEventListener("mousemove", (e) => {
			if (this.model.isAnyImageDragging()) {
				const rect = this.view.getCanvas().getBoundingClientRect();
				const x = e.clientX - rect.left;
				const y = e.clientY - rect.top;
				this.model.dragImage(x, y);
			}
		});

		this.view.getCanvas().addEventListener("mouseup", () => {
			this.model.stopDragging();
		});
	}

	update(image: File): void {
		this.model.addImage(image);
	}
}
