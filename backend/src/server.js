const express = require("express");
const cors = require("cors");

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const PORT = process.env.PORT || 5000; // default PORT to listen

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'SkylinePinz API',
    description: 'Node Express API to manager Pins, Users, Comments, and Images for the SkylinePinz Application.',
    version: '0.0.0',
    contact: {
      email: 'perlaalhaddad@gmail.com'
    }
  },
  servers: [
    {
      url: `http://localhost:${PORT}/api/`,
      description: 'Development server',
    },
  ],
  tags: [
    {
      name: "pin",
      description: "Pin requests"
    },
    {
      name: "user",
      description: "User requests"
    }
  ]
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['src/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

const app = express();

const corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());


const db = require("./models");
db.sequelize.sync({ force: true })
  // db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });


require("./routes/pin.routes")(app);
require("./routes/user.routes")(app);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// start the Express server
app.listen(PORT, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${PORT}`);
});
