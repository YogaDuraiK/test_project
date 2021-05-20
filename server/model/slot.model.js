const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var slotSchema = new Schema({
    from_time: {
        type: String,
        required: true,
    },
    to_time: {
        type: String,
        required: true,
    },
    slot_name: {
        type: String,
        required: true,
    },
    slot_type: {
        type: String,
        required: true,
    },
})

var Slot = mongoose.model('slots', slotSchema); 

async function slotListData(date, callback){
    /* Slot.find((err, succ)=>{
        if(!err) {
            callback(null,succ)
          } else {
            callback(err,null)
          }
    }); */
    Slot.aggregate([
        {
            $lookup: {
                from: 'bookings',
                let: {
                    slot: '$_id',
                    date: date,
                },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    {
                                        $eq: ['$date', '$$date'],
                                    },
                                    {
                                        $eq: ['$slot', '$$slot'],
                                    },
                                ],
                            },
                        },
                    },
                ],
                as: 'bookings',
            },
        },
    ]).then(function (respon, err) {
        if(!err) {
            callback(null,respon)
        } else {
            callback(err,null)
        }
    });
};

module.exports = { slotListData }
