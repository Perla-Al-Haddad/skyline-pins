
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

  const x = req.body.x;
  const y = req.body.y;

  // Create a Pin
  const pin = {
    id: uuidv4(),
    message: req.body.message,
    coords: x + ", " + y,
    userId: req.body.userId || null
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
// TODO: Add date limit
exports.findAll = (req, res) => {

  const x = req.query.x;
  const y = req.query.y;

  const message = req.query.message;
  const numberOfPins = req.query.numberOfPins || 10;

  var condition = message ? { message: { [Op.iLike]: `%${message}%` } } : null;

  var query = {
    where: condition
  }

  if (x && y) {
    query["attributes"] = {
      include: [
        [
          db.Sequelize.literal(`postgis.st_setsrid(coords::postgis.geometry, 4326) <-> postgis.st_setsrid(postgis.st_makepoint(${x},${y}),4326)`),
          'distance'
        ]
      ]
    };
    query["order"] = db.Sequelize.col('distance');
    query["limit"] = numberOfPins;
  }

  Pin.findAll(query)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

// Find a single Pin with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Pin.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Pin with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Pin with id=" + id
      });
    });
};

// Find the pins of a user given their id
exports.findByUser = (req, res) => {
  const userId = req.params.userId;
  Pin.findAll({
    where: { userId: userId }
  }).then(data => {
    if (data) {
      res.send(data);
    } else {
      res.status(404).send({
        message: `Cannot Pins for User with id=${userId}.`
      });
    }
  })
    .catch(err => {
      res.status(500).send({
        message: `Error retrieving Pins for User with id=${userId}.`
      });
    });
};

// Update a Pin by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  const updated_id = req.body.id;
  const x = req.body.x;
  const y = req.body.y;
  const message = req.body.message;

  // Create the Pin
  const pin = {};
  if (updated_id) pin["id"] = updated_id;
  if (message) pin["message"] = message;

  if (x != undefined && y != undefined) {
    const coords = x + ', ' + y;
    pin["coords"] = coords;
  }

  Pin.update(pin, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Pin was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Pin with id=${id}. Maybe Pin was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Pin with id=" + id
      });
    });
};

// Delete a Pin with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Pin.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Pin was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Pin with id=${id}. Maybe Pin was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Pin with id=" + id
      });
    });
};

// Delete all Pins from the database.
exports.deleteAll = (req, res) => {
  Pin.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Pins were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Pins."
      });
    });
};
