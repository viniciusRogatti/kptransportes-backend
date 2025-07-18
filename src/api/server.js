require('dotenv').config();
const http = require('http');
const { Server } = require('socket.io');
const express = require('express');
const axios = require('axios');
const app = require('./app');

const port = process.env.PORT || 3001;
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ['https://viniciusrogatti.github.io', 'http://localhost:3000', 'http://localhost:8081', 'exp://192.168.1.93:8081'],
    credentials: false,
    methods: ["GET", "POST"]
  },
});

// WebSocket
io.on('connection', (socket) => {
  console.log('Motorista conectado: ', socket.id);

  socket.on('update-location', (data) => {
    const { driverId, latitude, longitude, timestamp } = data;

    console.log(`Localização do motorista ${driverId}:`, latitude, longitude, timestamp);

    io.emit('driver_location', {
      driverId,
      latitude,
      longitude,
      timestamp,
    });
  });

  socket.on('disconnect', () => {
    console.log('Motorista desconectado');
  });
});

app.get('/geocode', async (req, res) => {
  const { address } = req.query;

  if (!address) {
    return res.status(400).json({ error: 'Endereço é obrigatório' });
  }

  try {
    const response = await axios.get('https://nominatim.openstreetmap.org/search', {
      params: {
        format: 'json',
        q: address,
      },
      headers: {
        'User-Agent': 'KPTransportesBot/1.0 (email@exemplo.com)', // substitua se quiser
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Erro ao consultar Nominatim:', error.message);
    res.status(500).json({ error: 'Erro ao buscar coordenadas' });
  }
});

server.listen(port, () => {
  console.log(`API rodando na porta ${port}`);
});

module.exports = { app, io };
