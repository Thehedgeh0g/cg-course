import {Image, Point} from "./Image";

export class Drawer {
	static drawLine(image: Image, from: Point, to: Point, color: string): void {
		const deltaX = Math.abs(to.x - from.x);
		const deltaY = Math.abs(to.y - from.y);

		if (deltaY > deltaX) {
			this.drawSteepLine(image, from, to, color);
		} else {
			this.drawSlopeLine(image, from, to, color);
		}
	}

	static drawEllipse(
		image: Image,
		center: Point,
		radiusX: number,
		radiusY: number,
		color: string,
	): void {
		let x = 0;
		let y = radiusY;
		let p1 =
			radiusY * radiusY -
			radiusX * radiusX * radiusY +
			0.25 * radiusX * radiusX;
		let dx = 2 * radiusY * radiusY * x;
		let dy = 2 * radiusX * radiusX * y;

		while (dx < dy) {
			this.plotEllipsePoints(image, center, x, y, color);
			if (p1 < 0) {
				x++;
				dx += 2 * radiusY * radiusY;
				p1 += dx + radiusY * radiusY;
			} else {
				x++;
				y--;
				dx += 2 * radiusY * radiusY;
				dy -= 2 * radiusX * radiusX;
				p1 += dx - dy + radiusY * radiusY;
			}
		}

		let p2 =
			radiusY * radiusY * (x + 0.5) * (x + 0.5) +
			radiusX * radiusX * (y - 1) * (y - 1) -
			radiusX * radiusX * radiusY * radiusY;

		while (y >= 0) {
			this.plotEllipsePoints(image, center, x, y, color);
			if (p2 > 0) {
				y--;
				dy -= 2 * radiusX * radiusX;
				p2 += radiusX * radiusX - dy;
			} else {
				y--;
				x++;
				dx += 2 * radiusY * radiusY;
				dy -= 2 * radiusX * radiusX;
				p2 += dx - dy + radiusX * radiusX;
			}
		}
	}

	static drawFilledEllipse(
		image: Image,
		center: Point,
		radiusX: number,
		radiusY: number,
		color: string,
		outlineColor: string,
	): void {
		let x = 0;
		let y = radiusY;
		let p1 =
			radiusY * radiusY -
			radiusX * radiusX * radiusY +
			0.25 * radiusX * radiusX;
		let dx = 2 * radiusY * radiusY * x;
		let dy = 2 * radiusX * radiusX * y;

		while (dx < dy) {
			this.drawLine(
				image,
				{x: center.x - x, y: center.y + y},
				{x: center.x + x, y: center.y + y},
				color,
			);
			this.drawLine(
				image,
				{x: center.x - x, y: center.y - y},
				{x: center.x + x, y: center.y - y},
				color,
			);

			if (p1 < 0) {
				x++;
				dx += 2 * radiusY * radiusY;
				p1 += dx + radiusY * radiusY;
			} else {
				x++;
				y--;
				dx += 2 * radiusY * radiusY;
				dy -= 2 * radiusX * radiusX;
				p1 += dx - dy + radiusY * radiusY;
			}
		}

		let p2 =
			radiusY * radiusY * (x + 0.5) * (x + 0.5) +
			radiusX * radiusX * (y - 1) * (y - 1) -
			radiusX * radiusX * radiusY * radiusY;

		while (y >= 0) {
			this.drawLine(
				image,
				{x: center.x - x, y: center.y + y},
				{x: center.x + x, y: center.y + y},
				color,
			);
			this.drawLine(
				image,
				{x: center.x - x, y: center.y - y},
				{x: center.x + x, y: center.y - y},
				color,
			);

			if (p2 > 0) {
				y--;
				dy -= 2 * radiusX * radiusX;
				p2 += radiusX * radiusX - dy;
			} else {
				y--;
				x++;
				dx += 2 * radiusY * radiusY;
				dy -= 2 * radiusX * radiusX;
				p2 += dx - dy + radiusX * radiusX;
			}
		}
		this.drawEllipse(image, center, radiusX, radiusY, outlineColor);
	}

	private static plotEllipsePoints(
		image: Image,
		center: Point,
		x: number,
		y: number,
		color: string,
	): void {
		image.setPixel({x: center.x + x, y: center.y + y}, color);
		image.setPixel({x: center.x - x, y: center.y + y}, color);
		image.setPixel({x: center.x + x, y: center.y - y}, color);
		image.setPixel({x: center.x - x, y: center.y - y}, color);
	}

	private static sign(value: number): number {
		return (value > 0 ? 1 : 0) - (value < 0 ? 1 : 0);
	}

	private static drawSteepLine(
		image: Image,
		from: Point,
		to: Point,
		color: string,
	): void {
		const deltaX = Math.abs(to.x - from.x);
		const deltaY = Math.abs(to.y - from.y);

		if (from.y > to.y) {
			[from, to] = [to, from];
		}

		const stepX = this.sign(to.x - from.x);
		const errorThreshold = deltaY + 1;
		const deltaErr = deltaX + 1;

		let error = deltaErr / 2;
		let p = {...from};

		while (p.y <= to.y) {
			image.setPixel({x: p.x, y: p.y}, color);
			error += deltaErr;

			if (error >= errorThreshold) {
				p.x += stepX;
				error -= errorThreshold;
			}
			p.y++;
		}
	}

	private static drawSlopeLine(
		image: Image,
		from: Point,
		to: Point,
		color: string,
	): void {
		const deltaX = Math.abs(to.x - from.x);
		const deltaY = Math.abs(to.y - from.y);

		if (from.x > to.x) {
			[from, to] = [to, from];
		}

		const stepY = this.sign(to.y - from.y);
		const errorThreshold = deltaX + 1;
		const deltaErr = deltaY + 1;

		let error = deltaErr / 2;
		let p = {...from};

		while (p.x <= to.x) {
			image.setPixel({x: p.x, y: p.y}, color);
			error += deltaErr;

			if (error >= errorThreshold) {
				p.y += stepY;
				error -= errorThreshold;
			}
			p.x++;
		}
	}
}
