const express = require('express')
const path = require('path');
const http = require('http');
const SocketIO = require('socket.io');

// variables globales
const app = express()
const port = process.env.PORT || 3000;
const server = http.createServer(app);


// importar sockets
module.exports.io = SocketIO(server);

require('../server/sockets/sockes.io');


//archivos estaticos
app.use(express.static(path.resolve(__dirname, '../public')));


server.listen(port, () => console.log(`Example app listening on port port!`))