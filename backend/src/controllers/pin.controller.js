
const { v4: uuidv4 } = require('uuid');
const db = require("../models");

const Pin = db.pins;
const Op = db.Sequelize.Op;

// Create and Save a new Pin
exports.create = (req, res) => {
  if (!req.body.message || !req.body.x || !req.body.y) {
    res.status(400).send({
      message: "Missing values"
    });
    return;
  }

  const x = String(parseFloat(req.body.x));
  const y = String(parseFloat(req.body.y));

  // Create a Pin
  const pin = {
    id: uuidv4(),
    message: req.body.message,
    coords:  x + ", " + y
  };

  // Save Tutorial in the database
  Pin.create(pin)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the pin."
      });
    });
};

// Retrieve all Pins from the database.
exports.findAll = (req, res) => {

};

// Find a single Pin with an id
exports.findOne = (req, res) => {

};

// Update a Pin by the id in the request
exports.update = (req, res) => {

};

// Delete a Pin with the specified id in the request
exports.delete = (req, res) => {

};

// Delete all Pins from the database.
exports.deleteAll = (req, res) => {

};

// Find all published Pins
exports.findAllPublished = (req, res) => {

};