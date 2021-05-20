const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var bookingSchema = new Schema({
    date: {
        type: String,
        required: true,
    },
    from_time: {
        type: String,
        required: true,
    },
    to_time: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        default: '',
    },
    slot: {
        type: Schema.Types.ObjectId,
        ref: 'slots',
    },
    patient: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
});

var Booking = mongoose.model('bookings', bookingSchema); 

async function bookingSlot(slot, callback){  
    let insertSlot = new Booking({
        date: slot.date,
        from_time: slot.from_time,
        to_time: slot.to_time,
        duration: slot.duration,
        comment: slot.comment,
        slot: slot.slot,
        patient: slot.patient
    });
    insertSlot.save((err, succ)=>{
        if(!err) {
            callback(null,succ)
          } else {
            callback(err,null)
          }
    });
}

async function pData(pid, callback){  
    Booking.find({ patient: pid }, (err, succ)=>{
        if(!err) {
            callback(null,succ)
        } else {
            callback(err,null)
        }
    }).populate({ path: 'slot' });
}

async function dData(callback){  
    Booking.find((err, succ)=>{
        if(!err) {
            callback(null,succ)
        } else {
            callback(err,null)
        }
    }).populate({ path: 'slot' })
    .populate({ path: 'patient' });
}

module.exports = { bookingSlot, pData, dData }