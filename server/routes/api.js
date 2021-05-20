var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

var patientController = require('../controller/patient.controller');
var slotController = require('../controller/slot.controller');

router.post('/patient/register', patientController.register);
router.post('/login', patientController.login);
router.get('/patient/slots/:date', verifyToken, slotController.slotList);
router.post('/patient/booking', verifyToken, slotController.slotBooking);
router.get('/patient/plist/:id', verifyToken, slotController.pList);
router.get('/patient/dlist', verifyToken, slotController.dList);
router.get('/test', verifyToken, function(req, res, next) {
    res.json({test: 'work'})
});


function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
  
    if (bearerHeader) {
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1];
      req.token = bearerToken;
      jwt.verify(req.token, process.env.JWT_TOKEN, (err, verifiedJwt) => {
        if(err){
            let temp = {
                result: 0,
                message: "Session Failed",
                data: [],
            }
            res.json(temp);
        }else{
            next();
        }
      })
    } else {
        // Forbidden
        let temp = {
            result: 0,
            message: "Session Failed",
            data: [],
        }
        res.json(temp);
    }
}

 
module.exports = router;
