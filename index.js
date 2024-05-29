// EXPRESS:
const express = require("express");
const app = express();
const errorHandler = require("errorhandler");
const helmet = require("helmet");
const Router = require("express-promise-router");
const config = require("./config");
var cors = require("cors");

const API_ENV = config.services.API;
const registerRoutes = require("./routers");
const router = Router();

// Descomentar para usar mongoDB
require('./storage/database/mongo');
// Descomentar para usar MySQL
// require("./storage/database/mysql");

// CORS:
var corsOptions = {
  //origin: ["https://daiot.com.ar"],
  origin: ["https://iotsuryon.com.ar"], // Lo dejo configurado para cuando haga el deploy en Cloud.
  optionsSuccessStatus: 200,
  methods: ["GET", "POST", "OPTIONS"],
};
app.use(cors());  // Use this option to accept request from outside on my development environment since I'll be testing it (for a start) as a localhost deploy.
//app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//helmet
app.use(helmet.xssFilter());
app.use(helmet.noSniff());
app.use(helmet.hidePoweredBy());
app.use(helmet.frameguard({ action: "deny" }));

router.use(errorHandler());

app.use(router);
//REGISTRO DE RUTAS
registerRoutes(router);

router.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send(err.message);
});

app.listen(API_ENV.PORT, function (req, res) {
  console.log(`API Funcionando... en: http://${API_ENV.HOST}:${API_ENV.PORT}`);
});
