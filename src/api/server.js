require('dotenv').config();
const http = require('http');
const { Server } = require('socket.io');
const app = require('./app');

const port = process.env.PORT || 3001;
const server = http.createServer(app); // Criando o servidor HTTP a partir do Express

const io = new Server(server, {
  cors: {
    origin: ['*'],
    credentials: false,
    methods: ["GET", "POST"]
  },
});

io.on('connection', (socket) => {
  console.log(`Novo motorista conectado: ${socket.id}`);

  socket.on('atualizar_localizacao', (dados) => {
    // Exemplo de dados: { motoristaId: 123, latitude: -23.55, longitude: -46.63 }
    console.log('Localização recebida:', dados);
    io.emit('nova_localizacao', dados); // Envia para todos os clientes conectados
  });

  socket.on('disconnect', () => {
    console.log(`Motorista desconectado: ${socket.id}`);
  });
});

server.listen(port, () => {
  console.log(`API rodando na porta ${port}`);
});

module.exports = { app, io };
