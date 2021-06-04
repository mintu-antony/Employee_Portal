const express = require("express");
const router = express.Router();
const empController = require("../controller/empController");

router.get("/", empController.findAll);
router.post("/", empController.create);
router.get("/:id", empController.findOne);
router.put("/:id", empController.UpdateUser);
router.delete("/:id", empController.delete);
module.exports = router;