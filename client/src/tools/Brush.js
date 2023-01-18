import Tools from './Tools';


export default class Brush extends Tools {

	constructor(canvas, socket, id) {
		super(canvas, socket, id);
		this.listen();
	}

	listen() {
		this.canvas.onmouseup = this.mouseUpHandler.bind(this);
		this.canvas.onmousedown = this.mouseDownHandler.bind(this); 
		this.canvas.onmousemove = this.mouseMoveHandler.bind(this); 
	}

	mouseUpHandler(e) {
		this.mouseDown = false;
		this.socket.send(JSON.stringify({
			method: 'draw',
			id: this.id,
			figure: {
				type: 'finish',
			},
		}));
	}

	mouseDownHandler(e) {
		this.mouseDown = true;
		this.ctx.beginPath();
		// Вызов функции перемещения курсора
		this.ctx.moveTo(
			e.pageX - e.target.offsetLeft,
			e.pageY - e.target.offsetTop
		);
	}

	mouseMoveHandler(e) {
		if(this.mouseDown) {
			// this.draw(
			// 	e.pageX - e.target.offsetLeft,
			// 	e.pageY - e.target.offsetTop
			// );
			this.socket.send(JSON.stringify({
				method: 'draw',
				id: this.id,
				figure: {
					type: 'brush',
					x: e.pageX - e.target.offsetLeft,
					y: e.pageY - e.target.offsetTop,
				},
			}));
		}
	}

	static draw(ctx, x, y) {
		// Вызов функции для отрисовки линии
		ctx.lineTo(x, y);
		//this.ctx.strokeStyle = 'rgb(0,0,0)';
		ctx.stroke();
		console.log('using brush');
	}
}