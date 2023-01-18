const { makeAutoObservable } = require("mobx");

class CanvasState {
	canvas = null;
	socket = null;
	sessionId = null;
	username = '';
	undoList = [];
	redoList = [];

	constructor() {
		// Эта функция делает отслеживаемыми данные хранящиеся в этом классе
		makeAutoObservable(this);
		this.undo = this.undo.bind(this);
		this.redo = this.redo.bind(this);
	}

	// Экшены - функции, которые изменяют состояние
	setCanvas(canvas) {
		this.canvas = canvas;
	}

	setSocket(socket) {
		this.socket = socket;
	}

	setSessionId(id) {
		this.sessionId = id;
	}

	setUsername(username) {
		this.username = username;
	}

	pushToUndo(data) {
		this.undoList.push(data);
	}

	pushToRedo(data) {
		this.redoList.push(data);
	}

	undo() {
		const ctx = this.canvas.getContext('2d');

		if(this.undoList.length > 0) {
			this.redoList.push(this.canvas.toDataURL());
			const img = new Image();
			img.src = this.undoList.pop();
			img.onload = () => {
				ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
				ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
			};
		} else {
			ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		}
	}

	redo() {
		const ctx = this.canvas.getContext('2d');

		if(this.redoList.length > 0) {
			this.undoList.push(this.canvas.toDataURL());
			const img = new Image();
			img.src = this.redoList.pop();
			img.onload = () => {
				ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
				ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
			};
		}
	}
}

export default new CanvasState();
