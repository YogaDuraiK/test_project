var userModel = require('../model/user.model');

function login(req, res, next){
    userModel.authUser(req.body, (err, succ)=>{
        if(!err){
            let temp = {
                result: 1,
                message: 'Login Successful',
                data: succ,
            }
            res.json(temp);
        } else {
            let message = '';
            if(err == 'invalid'){
                message = 'Invalid Login Creadentials';
            } else {
                message = 'Please Try Again';
            }
            let temp = {
                result: 0,
                message: message,
                data: [],
            }
            res.json(temp);
        }
    });
}

function register(req, res, next){
    userModel.addUser(req.body, (err, succ)=>{
        
        if(!err){
            let temp = {
                result: 1,
                message: 'User Registered Successful',
                data: [],
            }
            res.json(temp);
        } else {
            let message = '';
            if(err == 'exest'){
                message = 'Mobile Number Already Exist';
            } else {
                message = 'Please Try Again';
            }
            let temp = {
                result: 0,
                message: message,
                data: [],
            }
            res.json(temp);
        }
    });
}

module.exports = { register, login }