const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server, {
  connectionStateRecovery: {}
});

const puerto = 3002;
const ipWifi = "192.168.1.39";

let usersActive = 0;

// Express busque y abra el archivo index.html en la carpeta 'public'
app.use(express.static('public'));

/*
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});
*/

io.on('connection', (socket) => {
  usersActive++;
  console.log(`Usuario conectado: ${socket.id}`);
  console.log(`Usuarios activos: ${usersActive}`);

  socket.on('disconnect', () => {
    usersActive--;
    console.log(`Usuario desconectado: ${socket.id}`);
    console.log(`Usuarios activos: ${usersActive}`);
  });


  /*
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
  */

  // ! EVENTOS FRONTEND

  // * BRAZO ROBOTICO

  socket.on('range_base', (valor) => {
    io.emit('range_base', valor);
    console.log(`Base: ${valor}°`);
  });

  socket.on('range_cuerpo', (valor) => {
    io.emit('range_cuerpo', valor);
    console.log(`Cuerpo: ${valor}°`);
  });

  socket.on('range_brazo', (valor) => {
    io.emit('range_brazo', valor);
    console.log(`Brazo: ${valor}°`);
  });

  socket.on('garra', (valor) => {
    io.emit('garra', valor);
    console.log(`Garra: ${valor}`);
  });

  // * MOVIMIENTO CARRITO

  socket.on("mover", (direction) => {
    io.emit('mover', direction);
    console.log(`Moviendo carrito hacia: ${direction}`);
  });

  socket.on("detener", () => {
    io.emit('detener');
    console.log("Deteniendo carrito");
  });

  // ! EVENTOS ARDUINO

  socket.on('valores_sensores', (valor) => {
    io.emit('valores_sensores', valor);
  });
  
});

server.listen(puerto, () => {
  console.log(`Servidor corriendo en http://${ipWifi}:${puerto}`);
  console.log(`Servidor corriendo en http://localhost:${puerto}`);
});
