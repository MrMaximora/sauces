const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const userRoutes = require("./routes/user");
const sauceRoutes = require('./routes/sauce');
const path = require('path');
require('dotenv').config();

// DEPRECATION WARNINGS
mongoose.set('strictQuery', false);

//CONNECT TO MONGODB WITH MANGOOSE
mongoose
  .connect(
    process.env.MONGO_CONNECT,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !") )
  .catch(() => console.log("Connexion à MongoDB échouée !"));

const app = express();

//HEADERS FOR CORS ERROR
app.use((request, response, next) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  response.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.options('/*', (_, res) => {
  res.sendStatus(200);
});

// PARSE REQUESTS JSON
app.use(bodyParser.json());

//ROUTES
app.use("/api/auth", userRoutes);
app.use('/api/sauces', sauceRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;