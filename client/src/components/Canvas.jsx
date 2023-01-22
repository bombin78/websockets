import { observer }   from 'mobx-react-lite';
import React, {
  useEffect,
  useRef,
  useState,
}                     from 'react';
import { useParams }  from 'react-router-dom';
import { 
  Modal, 
  Button 
}                     from 'react-bootstrap';
import axios          from 'axios';
import canvasState    from '../store/canvasState';
import toolState      from '../store/toolState';
import Brush          from '../tools/Brush';
import Rect           from '../tools/Rect';
import '../styles/canvas.scss';


const Canvas = observer(() => {
  const canvasRef = useRef();
  const usernameRef = useRef();
  const [modal, setModal] = useState(true);
  const params = useParams();

  // Инициализация кисти по умолчанию
  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    canvasState.setCanvas(canvasRef.current);
    axios
      .get(`http://localhost:5000/image?id=${params.id}`)
      .then((resp) => {
          const img = new Image();
          img.src = resp.data;
          img.onload = () => {
            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height);
          };
      })
  }, []);

  // После ввода имени пользователя устанавливаем соединение по ws 
  useEffect(() => {
    if(canvasState.username) {
      const socket = new WebSocket(`ws://localhost:5000`);
      canvasState.setSocket(socket);
      canvasState.setSessionId(params.id);
      // Передаем инструмент 'Brush'в состояние
      toolState.setTool(new Brush(canvasRef.current, socket, params.id));
      socket.onopen = () => {
        socket.send(JSON.stringify({
          id: params.id,
          username: canvasState.username,
          method: 'connection',
        }))
      };
      socket.onmessage = (event) => {
        let msg = JSON.parse(event.data);
        switch (msg.method) {
          case 'connection':
            console.log(`Пользователь ${msg.username} присоединился`);
            break;
    
          case 'draw':
            drawHandler(msg);
            break;

          default:
            console.log('Метод не идентифицирован');
        }
      };
    }
  }, [canvasState.username]);

  const drawHandler = (msg) => {
    const figure = msg.figure;
    const ctx = canvasRef.current.getContext('2d');
    switch (figure.type) {
      case 'brush':
        Brush.draw(ctx, figure.x, figure.y);
        break;

      case 'rect':
        Rect.staticDraw(
          ctx, 
          figure.x, 
          figure.y, 
          figure.width, 
          figure.height,
          figure.color,
        );
        break;

      case 'finish':
        ctx.beginPath();
        break;

      case 'draw':
        drawHandler(msg);
        break;

      default:
        console.log('Метод не идентифицирован');
    }
  };

  const connectHandler = () => {
    canvasState.setUsername(usernameRef.current.value);
    setModal(false);
  };

  const mouseUpHandler = () => {
    canvasState.pushToUndo(canvasRef.current.toDataURL());
    axios
      .post(`http://localhost:5000/image?id=${params.id}`, {img: canvasRef.current.toDataURL()})
      .then((resp) => console.log(resp.data));
  };

  return (
    <div className="canvas">

      <Modal show={modal} onHide={() => setModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Введите ваше имя</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <input
            ref={usernameRef}
            type="text"
          />
        </Modal.Body>
        
        <Modal.Footer>
          <Button variant="secondary" onClick={() => connectHandler()}>
            Войти
          </Button>
        </Modal.Footer>
      </Modal>

      <canvas
        ref={canvasRef}
        width={600}
        height={400}
        onMouseUp={mouseUpHandler}
      />
    </div>
  );
});

export default Canvas;
