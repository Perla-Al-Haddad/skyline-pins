module.exports = app => {
  const pins = require("../controllers/pin.controller.js");

  var router = require("express").Router();

  // TODO: Document rest of routes

  /**
   * @swagger
   * /pins:
   *   post:
   *     tags: 
   *       - pin
   *     summary: Create a new Pin
   *     description: Create a new pin given the message, x and y coordinates, and userId (optional)
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               x: 
   *                 type: float
   *                 description: lat field
   *                 example: 47.165222957107325
   *               y: 
   *                 type: float
   *                 description: lon field
   *                 example: 19.95637071093757
   *               message:
   *                 type: string
   *               userId: 
   *                 type: string
   *     responses:
   *       201:
   *         description: Created
   *         content:
   *           application/json:
   *             schema:
   *                 items:
   *                   type: object
   *                   properties:
   *                     id:
   *                       type: strng
   *                       description: The pin ID.
   *                       example: 96957c1e-9f95-41a7-96a8-f9a8115c4cbc
   *                     coords:
   *                       type: object
   *                       properties:
   *                         x: 
   *                           type: float
   *                           description: lat field
   *                           example: 47.165222957107325
   *                         y: 
   *                           type: float
   *                           description: lon field
   *                           example: 19.95637071093757
   *                     message:
   *                       type: string
   *                     createdAt:
   *                       type: string
   *                       format: date-time
   *                     updatedAt:
   *                       type: string
   *                       format: date-time
   *                     userId: 
   *                      type: string
   */
  // Create a new pin
  router.post("/", pins.create);

  /**
   * @swagger
   * /pins:
   *   get:
   *     tags: 
   *       - pin
   *     summary: Find all Pins
   *     description: Find all pins for a given filter. Can filter based on message, and on top closest pins to a specified point.
   *     responses:
   *       200:
   *         description: A list of users.
   *         content:
   *           application/json:
   *             schema:
   *                 items:
   *                   type: object
   *                   properties:
   *                     id:
   *                       type: strng
   *                       description: The pin ID.
   *                       example: 96957c1e-9f95-41a7-96a8-f9a8115c4cbc
   *                     coords:
   *                       type: object
   *                       properties:
   *                         x: 
   *                           type: float
   *                           description: lat field
   *                           example: 47.165222957107325
   *                         y: 
   *                           type: float
   *                           description: lon field
   *                           example: 19.95637071093757
   *                     message:
   *                       type: string
   *                     createdAt:
   *                       type: string
   *                       format: date-time
   *                     updatedAt:
   *                       type: string
   *                       format: date-time
   *                     userId: 
   *                      type: string
   */
  // Retrieve all pins
  router.get("/", pins.findAll);

  // Retrieve a single pin with id
  router.get("/:id", pins.findOne);

  // Retrieve the pins for a user given their id
  router.get("/user_pins/:userId", pins.findByUser)

  // Update a pin with id
  router.put("/:id", pins.update);

  // Delete a pin with id
  router.delete("/:id", pins.delete);

  // Create a new pin
  router.delete("/", pins.deleteAll);

  app.use('/api/pins', router);
};