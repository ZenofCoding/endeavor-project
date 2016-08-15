// *********************************************************************************
// CONNECTION.JS - THIS FILE INITIATES THE CONNECTION TO MYSQL
// *********************************************************************************

var mysql = require('mysql');

// we placed the connections in this source object
var source = {
    // localhost
    localhost: {
        port: 3306,
        host: 'gx97kbnhgjzh3efb.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        user: 'kopdakel41c0b6bm',
        password: "c377x1xc6713qabw",
        database: "pwdopoqcppufqavw" 
    },


    // jawsDB
    jawsDB: {
        port: 3306,
        host: 'gx97kbnhgjzh3efb.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        user: 'kopdakel41c0b6bm',
        password: "c377x1xc6713qabw",
        database: "pwdopoqcppufqavw" 
    }
}

// we use source.[name of connection] to hook into mysql
var connection = mysql.createConnection(source.jawsDB || source.localhost);


connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});

module.exports = connection;
