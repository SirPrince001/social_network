const router = require("express").Router();

router.use(require("./auth"));
router.use(require("./users"));
router.use(require("./post"));

module.exports = router;
