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
import canvasState    from '../store/canvasState';
import toolState      from '../store/toolState';
import Brush          from '../tools/Brush';
import '../styles/canvas.scss';


const Canvas = observer(() => {
  const canvasRef = useRef();
  const usernameRef = useRef();
  const [modal, setModal] = useState(true);
  const params = useParams();
  console.log('params', params);

  // Инициализация кисти по умолчанию
  useEffect(() => {
    canvasState.setCanvas(canvasRef.current);
    // Передаем выбранный инструмент в состояние
    toolState.setTool(new Brush(canvasRef.current));
  }, []);

  // После ввода имени пользователя устанавливаем соединение по ws 
  useEffect(() => {
    if(canvasState.username) {
      const socket = new WebSocket(`ws://localhost:5000`);
      socket.onopen = () => {
        socket.send(JSON.stringify({
          id: params.id,
          username: canvasState.username,
          method: 'connection',
        }))
      };
      socket.onmessage = (event) => {
        console.log('event.data', event.data);
      };
    }
  }, [canvasState.username]);

  const mouseDownHandler = () => {
    canvasState.pushToUndo(canvasRef.current.toDataURL());
  };

  const connectHandler = () => {
    canvasState.setUsername(usernameRef.current.value);
    setModal(false);
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
        onMouseDown={mouseDownHandler}
      />
    </div>
  );
});

export default Canvas;
