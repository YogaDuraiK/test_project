const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    gendar: {
        type: String,
        required: true,
        enum: ['M', 'F'],
    },
    age: {
        type: Number,
        required: true,
    },
    contact: {
        type: String,
        required: true,
    },
    address: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    user_type: {
        type: String,
        required: true,
        enum: ['D', 'P'],
        default: 'P'
    }
});

var User = mongoose.model('users', userSchema); 

async function authUser(user, callback){
    let userDetails = await User.find({ contact: user.mobile });
    if(userDetails.length >= 1){
        bcrypt.compare(user.password, userDetails[0].password, (err, result) => {
            if(result){
                const token = jwt.sign({
                    contact: userDetails[0].contact,
                    userId: userDetails[0]._id,
                }, 
                process.env.JWT_TOKEN,
                {
                    expiresIn: '1h'
                });
                
                callback(null,{user_data: userDetails[0], token: token});
            } else {
                callback('invalid',null)
            }
        });
    } else {
        callback('invalid',null)
    }
}

async function addUser(user, callback){  
    const salt = await bcrypt.genSalt(10);
    let dePassword = await bcrypt.hash(user.password, salt);
    let insertUser = new User({
        name: user.name,
        gendar: user.gendar,
        age: user.age,
        contact: user.contact,
        address: user.address,
        password: dePassword
    });
    let contactCheck = await User.find({ contact: user.contact });
    if(contactCheck.length != 0){
        callback('exest',null)
    } else {
        insertUser.save((err, succ)=>{
            if(!err) {
                callback(null,succ)
              } else {
                callback(err,null)
              }
        });
    }
}

module.exports = { addUser, authUser }