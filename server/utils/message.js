var moment = require('moment');
var date = moment().format('   h:m a  ');
var generateMessage = (from,text) => {
    return {
        from,
        text,
        createdAt:date
    };
};

var generateLocationMessage = (from,latitude,longitude) => {
    return {
        from,
        url:`https://www.google.com/maps?q=${latitude},${longitude}`,
        createdAt:date
    };
};


module.exports = {generateMessage,generateLocationMessage};