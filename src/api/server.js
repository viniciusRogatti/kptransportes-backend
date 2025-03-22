require('dotenv').config();
const http = require('http');
const { Server } = require('socket.io');
const app = require('./app');

const port = process.env.PORT || 3001;
const server = http.createServer(app); // Criando o servidor HTTP a partir do Express

const io = new Server(server, {
  cors: {
    origin: ['https://viniciusrogatti.github.io', 'http://localhost:3000', 'http://localhost:8081', 'exp://192.168.1.93:8081'],
    credentials: false,
    methods: ["GET", "POST"]
  },
});

io.on('connection', (socket) => {
  console.log('Motorista conectado: ', socket.id);

  // Recebe a localização do motorista
  socket.on('update-location', (data) => {
    const { driverId, latitude, longitude, timestamp } = data;

    console.log(`Localização do motorista ${driverId}:`, latitude, longitude, timestamp);

    // Emite a localização para todos os outros clientes conectados
    io.emit('new-location', {
      driverId,
      latitude,
      longitude,
      timestamp,
    });

    // Se você quiser mandar a localização para um cliente específico
    // socket.broadcast.emit('new-location', data); // Envia para todos, menos o próprio
  });

  // Quando o motorista se desconectar
  socket.on('disconnect', () => {
    console.log('Motorista desconectado');
  });
});

server.listen(port, () => {
  console.log(`API rodando na porta ${port}`);
});

module.exports = { app, io };
