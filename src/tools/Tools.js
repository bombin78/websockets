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
}