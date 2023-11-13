const express = require('express')
const router = express.Router();
const {userRegister, userLogin, getUser} = require('../controlllers/userController')
const {protect} = require('../middleware/authMiddleware')


router.post('/',userRegister);
router.post('/login',userLogin);
router.get('/user',protect,getUser);


module.exports = router