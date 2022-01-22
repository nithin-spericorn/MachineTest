const express = require('express')
const router = express.Router();
const userController = require("../Controller/userController");
const { verifyToken ,verifyAdmin} = require('../middleware/veryfyToken');

router.post('/sign-up', userController.signUp);

router.post('/login', userController.login)

router.post("/createmsg", userController.createmsg)

router.get("/msg",userController.msg)

router.put("/msg",userController.updatemsg)

router.delete("/d",userController.removeitem)

router.get("/display",userController.displaymsg)

module.exports = router;