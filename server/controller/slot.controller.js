var slotModel = require('../model/slot.model');
var bookingModel = require('../model/booking.model');

function slotList(req, res, next){
    slotModel.slotListData(req.params.date, (err, succ)=>{
        if(!err){
            let temp = {
                result: 1,
                message: 'Slot List Data Fetch Successful',
                data: succ,
            }
            res.json(temp);
        } else {
            let temp = {
                result: 0,
                message: 'Slot List Data Fetch Failed',
                data: [],
            }
            res.json(temp);
        }
    });
}

function slotBooking(req, res, next){
    bookingModel.bookingSlot(req.body, (err, succ)=>{
        if(!err){
            let temp = {
                result: 1,
                message: 'Slot Booking Successful',
                data: [],
            }
            res.json(temp);
        } else {
            let temp = {
                result: 0,
                message: 'Slot Booking Failed. Please Try Again',
                data: [],
            }
            res.json(temp);
        }
    });
}

function pList(req, res, next){
    bookingModel.pData(req.params.id, (err, succ)=>{
        if(!err){
            let temp = {
                result: 1,
                message: 'Appoinment Data Fetch Successful',
                data: succ,
            }
            res.json(temp);
        } else {
            let temp = {
                result: 0,
                message: 'Appoinment Data Fetch Failed',
                data: [],
            }
            res.json(temp);
        }
    });
}

function dList(req, res, next){
    bookingModel.dData((err, succ)=>{
        if(!err){
            let temp = {
                result: 1,
                message: 'Appoinment Data Fetch Successful',
                data: succ,
            }
            res.json(temp);
        } else {
            let temp = {
                result: 0,
                message: 'Appoinment Data Fetch Failed',
                data: [],
            }
            res.json(temp);
        }
    });
}

module.exports = { slotList, slotBooking, pList, dList }