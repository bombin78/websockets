const { makeAutoObservable } = require("mobx");

class ToolState {
	tool = null;

	constructor() {
		// Эта функция делает отслеживаемыми данные хранящиеся в этом классе
		makeAutoObservable(this)
	}

	// Экшены - функции, которые изменяют состояние
	setTool(tool) {
		this.tool = tool;
	}

	setFillColor(color) {
		this.tool.fillColor = color;
	}

	setStrokeColor(color) {
		this.tool.strokeColor = color;
	}

	setLineWidth(width) {
		this.tool.lineWidth = width;
	}
}

export default new ToolState();
