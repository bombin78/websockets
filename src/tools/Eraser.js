import Brush from "./Brush";


export default class Eraser extends Brush {

    draw(x, y) {
        this.ctx.strokeStyle = 'rgb(255,255,255)';
        this.ctx.lineTo(x, y);
        this.ctx.stroke();

        console.log('using eraser');
    }
}
