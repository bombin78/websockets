import Tools from './Tools';


export default class Rect extends Tools {
	
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
		// Запуск функции, которая говорит о том,
		// что начали рисовать новую фигуру
		this.startX = e.pageX - e.target.offsetLeft;
		this.startY = e.pageY - e.target.offsetTop;
		// Каждый раз при нажатии на кнопку сохраняем ссылку
		// на текущее изображение холста (canvas)
		this.saved = this.canvas.toDataURL();
	}

	mouseMoveHandler(e) {
		if(this.mouseDown) {
			const currentX = e.pageX - e.target.offsetLeft;
			const currentY = e.pageY - e.target.offsetTop;
			const width = currentX - this.startX;
			const height = currentY - this.startY;

			// Эта функция будет вызываться каждый раз,
			// когда пользователь пошевелил мышкой
			this.draw(
				this.startX,
				this.startY,
				width,
				height
			);
		}
	}

	draw(x, y, w, h) {
		const img = new Image();
		img.src = this.saved;
		// Слушатель события отрабатывающий в тот
		// момент, когда установилось изображение
		img.onload = () => {
			// Очистка холста от нарисованных фигур
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
			// Рисуем на холсте сохраненные ранее изображения
			this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
			// Запуск функции, которая говорит о том,
			// что начали рисовать новую фигуру
			this.ctx.beginPath();
			// Вызов функции для отрисовки прямоугольника
			this.ctx.rect(x, y, w, h);
			// Вызов функции для заполнения прямоугольника
			this.ctx.fill();
			// Задаем цвет, используемый при выполнении обводки фигур (контура)
			this.ctx.strokeStyle = 'rgb(0,0,0)';
			// Вызов функции для обводки контура, который был заранее задан.
			// Цвет задается через strokeStyle, по умолчанию он черный.
			this.ctx.stroke();
			console.log('using rect');
		};
	}
}
