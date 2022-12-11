import Tools from './Tools';


export default class Brush extends Tools {

	constructor(canvas) {
		super(canvas);
		this.listen();
	}

	listen() {
		this.canvas.onmouseup = this.mouseUpHandler.bind(this);
		this.canvas.onmousedown = this.mouseDownHandler.bind(this); 
		this.canvas.onmousemove = this.mouseMoveHandler.bind(this); 
	}

	mouseUpHandler(e) {
		this.mouseDown = false;
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
			this.draw(
				e.pageX - e.target.offsetLeft,
				e.pageY - e.target.offsetTop
			);
		}
	}

	draw(x, y) {
		// Вызов функции для отрисовки линии
		this.ctx.lineTo(x, y);
		//this.ctx.strokeStyle = 'rgb(0,0,0)';
		this.ctx.stroke();
		console.log('using brush');
	}
}