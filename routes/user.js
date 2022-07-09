const express = require('express');
const authMiddleware = require('../middleware/authMiddleware')
const router = express.Router();

const authController = require('../controllers/authController');

router.get('/',(req,res,next)=>{
    res.json({
        "message":"Hello"
    })
})


router.post('/login',authController.login);
router.post('/register',authController.register);
router.get('/home',authMiddleware,(req,res,next)=>{
    res.json({
        "message":"Hello Userr"
    })
})

module.exports = router;