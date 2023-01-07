module.exports = app => {
  const pins = require("../controllers/pin.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", pins.create);

  // // Retrieve all pins
  // router.get("/", pins.findAll);

  // // Retrieve a single Tutorial with id
  // router.get("/:id", pins.findOne);

  // // Update a Tutorial with id
  // router.put("/:id", pins.update);

  // // Delete a Tutorial with id
  // router.delete("/:id", pins.delete);

  // // Create a new Tutorial
  // router.delete("/", pins.deleteAll);

  app.use('/api/pins', router);
};