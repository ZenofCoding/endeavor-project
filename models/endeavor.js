// require (object relational mapping) orm.js file
var orm = require('../config/orm.js');

// object that is accessed from the gets and posts from endeavor_controller.js
var endeavor = {
  // calls SELECT */all function in orm.js passing table name
  all: function (table, cb) {
    orm.all(table, function (res) {
      cb(res);
    });
  },
  // calls SELECT */all function where condition = ? in orm.js passing table name
  allWhere: function (table, condition, cb) {
    orm.allWhere(table, condition, function (res) {
      cb(res);
    });
  },
  // calls INSERT/create function in orm.js
  // passes table name, column name, and value
  // cols and vals are arrays
  create: function (table, cols, vals, cb) {
    orm.create(table, cols, vals, function (res) {
      cb(res);
    });
  },
  distinct: function  (table, col, cb) {
    orm.create(table, col, function (res) {
      cb(res);
      console.log(res);
    });
  },
  // calls UPDATE/update function in orm.js
  // passes table name, column name, value, and id
  // objColVals is object
  update: function (table, objColVals, condition, cb) {
    orm.update(table, objColVals, condition, function (res) {
      cb(res);
    });
  },
  // calls UPDATE/update function in orm.js
  // passes table name, column name, value, and id
  // objColVals is object
  updateString: function (table, objColVals, condition, cb) {
    orm.updateString(table, objColVals, condition, function (res) {
      cb(res);
    });
  }
};

// makes orm accessible to endeavor_controller.js
module.exports = endeavor;