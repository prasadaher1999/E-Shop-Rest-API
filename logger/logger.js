var winston = require('winston');//error logging module

logger =  new winston.createLogger({
    transports:[
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logfile.log' }) 
    ],
});


  module.exports = {logger};