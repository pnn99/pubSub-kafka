const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./src/routes/authRoutes');
const kafkaRoutes = require('./src/routes/kafkaRoutes');
const reservationRoutes = require('./src/routes/reservationRoutes'); // Importa as rotas de reserva
const session = require('express-session');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public')); // Servir arquivos estáticos da pasta public
app.use(session({
    secret: 'bliu', // Substitua por uma chave secreta real
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Em produção, use true para HTTPS
}));

// Rota principal
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/login.html'); // Página inicial é o login
});

app.use('/auth', authRoutes);
app.use('/kafka', kafkaRoutes);
app.use('/reservations', reservationRoutes);  // Adiciona as rotas de reserva

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
