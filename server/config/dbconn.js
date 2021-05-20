require('dotenv').config()
module.exports = {
    LocalDB : process.env.MONGOOSE_CONNECT,
};