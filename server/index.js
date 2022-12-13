const express = require('express');
const ws = require('express-ws');


const app = express();
const wsServer = ws(app);
const aWss = wsServer.getWss();

const PORT = process.env.PORT || 5000;

app.ws('/', (ws, req) => {
	ws.on('message', (msg) => {
		msg = JSON.parse(msg);
		switch (msg.method) {
			case 'connection':
				connectionHandler(ws, msg);
				break;
		}
	});
})

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

const connectionHandler = (ws, msg) => {
	ws.id = msg.id;
	broadcastConnection(ws, msg);
};

const broadcastConnection = (ws, msg) => {
	aWss.clients.forEach((client) => {
		if(client.id === msg.id) {
			console.log('client', client.id);
			client.send(`Пользователь ${msg.username} подключился`);
		}
	});
};
