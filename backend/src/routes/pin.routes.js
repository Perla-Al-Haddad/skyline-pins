module.exports = app => {
  const pins = require("../controllers/pin.controller.js");

  var router = require("express").Router();

  // Create a new pin
  router.post("/", pins.create);

  // Retrieve all pins
  router.get("/", pins.findAll);

  // Retrieve a single pin with id
  router.get("/:id", pins.findOne);

  // Update a pin with id
  router.put("/:id", pins.update);

  // Delete a pin with id
  router.delete("/:id", pins.delete);

  // Create a new pin
  router.delete("/", pins.deleteAll);

  app.use('/api/pins', router);
};