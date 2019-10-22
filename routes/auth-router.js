var express = require("express");
var router = express();

var AuthController = require("../controller/auth-controller");
var authController = new AuthController();

router.use(express.json()) // for parsing application/json
router.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

router.post("/", async (req, res, next) => {
    try {
        let data = req.body;
        var token = await authController.signIn(data.user, data.password);
        
        res.setHeader('authorization', token);
        res.status(200).send();
    } catch (error){
        next(error);
    }
});

module.exports = router;