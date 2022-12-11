import Tools from './Tools';


export default class Circle extends Tools {

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
        this.startX = e.pageX - e.target.offsetLeft;
        this.startY = e.pageY - e.target.offsetTop;
        this.saved = this.canvas.toDataURL();
    }

    mouseMoveHandler(e) {
        if(this.mouseDown) {
            const currentX =  e.pageX - e.target.offsetLeft;
            const currentY =  e.pageY - e.target.offsetTop;
            const width = currentX - this.startX;
            const height = currentY - this.startY;
            const radius = Math.sqrt(width**2 + height**2);

            this.draw(
				this.startX,
				this.startY,
				radius
			);
        }
    }

    draw(x, y, r) {
        const img = new Image();
        img.src = this.saved;
        img.onload = () => {
            this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
            this.ctx.beginPath();
            this.ctx.arc(x, y, r, 0, 2*Math.PI);
            this.ctx.fill();
            //this.ctx.strokeStyle = 'rgb(0,0,0)';
            this.ctx.stroke();
            console.log('using circle');
        };
    }
}
