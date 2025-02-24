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
			this.model.startDrawing(x, y);
		});

		this.view.getCanvas().addEventListener("mousemove", (e) => {
			if (this.model.isDrawingNow()) {
				const rect = this.view.getCanvas().getBoundingClientRect();
				const x = e.clientX - rect.left;
				const y = e.clientY - rect.top;
				this.model.drawLine(x, y);
			}
		});

		this.view.getCanvas().addEventListener("mouseup", () => {
			this.model.stopDrawing();
		});
	}

	update(image: File | null, brushSize: number, color: string): void {
		if (image !== null) {
			this.model.addImage(image);
		}
		this.model.changeBrushSize(brushSize);
		this.model.changeColor(color);
	}
}
