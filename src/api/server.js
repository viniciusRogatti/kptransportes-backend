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

// Armazenar o mapeamento dos motoristas
const motoristas = new Map();

io.on('connection', (socket) => {
  console.log(`Novo motorista conectado: ${socket.id}`);

  // Registrar motorista no backend
  socket.on('register_driver', ({ driverId }) => {
    motoristas.set(driverId, socket.id);
    console.log(`Motorista registrado: ID ${driverId} com socket ${socket.id}`);
  });

  socket.on('driver_location', async (dados) => {
    console.log('Localização recebida:', dados);

    // Emitir para todos os clientes conectados
    io.emit('driver_location', dados);
  });

  socket.on('disconnect', () => {
    console.log(`Motorista desconectado: ${socket.id}`);

    // Remover motorista do mapa
    for (let [driverId, socketId] of motoristas.entries()) {
      if (socketId === socket.id) {
        motoristas.delete(driverId);
        console.log(`Motorista removido: ${driverId}`);
        break;
      }
    }
  });
});

server.listen(port, () => {
  console.log(`API rodando na porta ${port}`);
});

module.exports = { app, io };
