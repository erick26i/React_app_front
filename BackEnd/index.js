require('dotenv').config();

const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const app = express();
const multer = require('multer');

const { isAuthenticated } = require('./middleware/middleware');

const {
  createService,
  markAsComplete,
  getServices,
  deleteService,
  completedService,
} = require('./Repositories/services');

const { login } = require('./controllers/users');

const { register } = require('./controllers/register');

const { addComment } = require('./controllers/controladores');

const { getUsers } = require('./controllers/getUsers');

const { storage } = require('./controllers/storage');

const { uploadFile } = require('./controllers/uploadFile');

const upLoad = multer({ storage });
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// USUARIOS ANONIMOS
//Lista de servicios
app.get('/service/list', completedService, getServices);

// Hacemos login
app.post('/login', login);

// Registramos en la aplicacion
app.post('/register', register);

// USUARIOS REGISTRADOS
// Añado servicios a la base de datos, comprobando si el usuario esta autenticado.
app.post('/service/add', isAuthenticated, createService);

// Eliminamos servicio
app.delete('/service/:id/delete', isAuthenticated, deleteService);

// Obtencion de usuarios registrados
app.get('/service/users', getUsers);

// Añado comentarios
app.patch('/service/:id/add', isAuthenticated, addComment);

// Marcar servicio como resuelto
app.patch('/service/:id', isAuthenticated, markAsComplete);

//Upload File & Img
app.post(
  '/service/:id/upfile',
  isAuthenticated,
  upLoad.single('file'),
  uploadFile
);

// Servidor localhost:SERVER_PORT
app.listen(process.env.SERVER_PORT, () => {
  console.log(`Listening on port ${process.env.SERVER_PORT}`);
});
