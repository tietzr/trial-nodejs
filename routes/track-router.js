var express = require("express");
var router = express();
var nls = require("../nls/strings");

var TrackController = require("../controller/track-controller");
var trackController = new TrackController();

router.use(express.json()) // for parsing application/json
router.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

router.post("/", async (req, res, next) => {
    if(!req.body.data) res.status(500).send(new Error(nls.PayloadError));
    
    try {
        var result = await trackController.generateTrack(req.body.data);
        res.status(200).send(result);
    } catch (error) { next(error) };
});

module.exports = router;