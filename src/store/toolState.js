const { makeAutoObservable } = require("mobx");

class ToolState {
	tool = null;

	constructor() {
		// Эта функция делает отслеживаемыми данные хранящиеся в этом классе
		makeAutoObservable(this)
	}

	// Экшен - функция, которая изменяет состояние
	setTool(tool) {
		this.tool = tool;
	}
}

export default new ToolState();
