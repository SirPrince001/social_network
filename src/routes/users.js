const router = require("express").Router();
const injector = require("../services/request_injector");
const search = require("../controllers/searchUser");
const followU = require("../controllers/followUser");

router.get("/search", injector(search.searchUser));
router.post("/follow", injector(followU.followUser));
module.exports = router;
