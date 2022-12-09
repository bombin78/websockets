const { makeAutoObservable } = require("mobx");

class CanvasState {
	canvas = null;

	constructor() {
		// Эта функция делает отслеживаемыми данные хранящиеся в этом классе
		makeAutoObservable(this)
	}

	// Экшен - функция, которая изменяет состояние
	setCanvas(canvas) {
		this.canvas = canvas;
	}
}

export default new CanvasState();
