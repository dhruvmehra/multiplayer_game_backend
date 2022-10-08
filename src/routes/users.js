var express = require("express");
var router = express.Router();
const userController = require("../controllers/user.controller");

/* GET users listing. */
router.get("/all", function (req, res, next) {
  userController.getUsers().then((data) => res.json(data));
});

router.post("/add", (req, res, next) => {
  console.log(req.body);
  userController.createUser(req.body.user).then((data) => res.json(data));
});

router.put("/user", (req, res, next) => {
  userController.updateUser(req.body.user).then((data) => res.json(data));
});

router.delete("/delete/:id", (req, res, next) => {
  userController.deleteUser(req.params.id).then((data) => res.json(data));
});

router.get("/", (req, res, next) => {
  res.send(`<h1>API Works !!!</h1>`);
});

module.exports = router;
