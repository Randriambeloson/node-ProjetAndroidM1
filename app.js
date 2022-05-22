
/* To Allow module path like ./_helpers/jwt to _helpers/jwt */
require('rootpath')();

/* Initialisation de toutes les modules nécessaires */
const http = require('http');
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
let io = require('socket.io');
const errorHandler = require('_helpers/error-handler');
const upload = multer({ limits: { fieldSize: 50000000 } });

/* Initialisation des controllers */

const UtilisateurController = require('./app/controllers/Utilisateur.controller');
const JeuController = require('./app/controllers/Jeu.controller');

/* Configuration de la constante app */
const app = express();
// app.use(bodyParser.raw());
/* Création du serveur à partir de la constante app d'Express */
const server = http.createServer(app);

/* Initialisation du WebSocket côté serveur */
io = io(server);

app.use(express.json({
  limit: '50mb'
}));
app.use(express.urlencoded({
  limit: '50mb', extended: true
}));

app.use(cors());

// For parsing multipart/form-data
app.use(upload.array());

app.use('/', express.static(path.join(__dirname, '/')));
app.use('/config', express.static(path.join(__dirname, '/config')));

/* Gestion d'erreur global */
app.use(errorHandler);

/* Intégration des controllers à la constante app */
UtilisateurController(app);
JeuController(app);


/** Gestion des événements liés au WebSocket */
// SocketIO.listen(io);

/* Configuration du PORT du serveur */
server.listen(process.env.PORT || 1111);
console.log('Application M1 ITU is running');
