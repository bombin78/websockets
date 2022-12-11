const express = require('express');
const ws = require('express-ws');


const app = express();
const wsServer = ws(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
