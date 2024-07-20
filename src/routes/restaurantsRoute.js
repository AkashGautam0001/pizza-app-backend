const express = require("express");
const { bookTable } = require("../controllers/restaurantsController");

const restaurantsRouter = express.Router();

restaurantsRouter.post("/:id", bookTable);

module.exports = restaurantsRouter;
