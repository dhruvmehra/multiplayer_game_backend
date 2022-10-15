var express = require("express");
var router = express.Router();
const gameController = require("../controllers/game.controller");

/* GET games listing. */
router.get("/games/all", function (req, res, next) {
  gameController.getUsers().then((data) => res.json(data));
});

router.post("/games/add", (req, res, next) => {
  console.log(req.body);
  gameController.createUser(req.body.game).then((data) => res.json(data));
});

router.delete("games/delete/:id", (req, res, next) => {
  gameController.deleteUser(req.params.id).then((data) => res.json(data));
});

router.get("/games", (req, res, next) => {
  res.send(`<h1>Games API Works !!!</h1>`);
});

module.exports = router;
