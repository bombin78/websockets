export default class Tool {
	constructor(canvas) {
		this.canvas = canvas;
		// Объект для манипуляций на холсте(canvas)
		this.ctx = canvas.getContext('2d');
		this.destroyEvents();
	}

	destroyEvents() {
		this.canvas.onmouseup = null;
		this.canvas.onmousedown = null; 
		this.canvas.onmousemove = null; 
	}

	set fillColor(color) {
		this.ctx.fillStyle = color;
	}

	set strokeColor(color) {
		this.ctx.strokeStyle = color;
	}

	set lineWidth(width) {
		this.ctx.lineWidth = width;
	}
}