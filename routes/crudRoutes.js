const express = require("express");
const router = express.Router();
const crudController = require("../controllers/crudController");

router.get("api/users", crudController.getAllUsers);
router.post("api/users", crudController.createUser);
router.put("api/users/:id", crudController.updateUser);
router.delete("api/users/:id", crudController.deleteUser);

module.exports = router;
