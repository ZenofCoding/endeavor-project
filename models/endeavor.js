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
  // calls SELECT */all function where condition = ? in orm.js passing table name
  allParentPm: function (table, condition1, condition2, condition3, condition4, condition5, condition6, condition7, condition8, cb) {
    orm.allParentPm(table, condition1, condition2, condition3, condition4, condition5, condition6, condition7, condition8, function (res) {
      cb(res);
    });
  },
  // calls SELECT multiple columns function where condition = ? in orm.js passing table and param names
  manyWhere: function (params, table, condition, cb) {
    orm.manyWhere(params, table, condition, function (res) {
      cb(res);
    });
  },
  // calls SELECT multiple columns function where condition = ? in orm.js passing table and param names
  manyWhereAsc: function (params, table, condition1, condition2, cb) {
    orm.manyWhereAsc(params, table, condition1, condition2, function (res) {
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
  // distinct: function  (table, col, cb) {
  //   orm.distinct(table, col, function (res) {
  //     cb(res);
  //     console.log(res);
  //   });
  // },
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
  },
  // calls leftJoin function in orm.js
  // passes table name, column name, value, and id
  // objColVals is object
  leftJoin: function (colNames, table1, table2, condition, cb) {
    orm.leftJoin(colNames, table1, table2, condition, function (res) {
      cb(res);
    });
  },
  // calls innerJoin 3 table function in orm.js
  // passes table names, column names, values, and ids
  innerJoin3: function (colNames, table1, table2, table3, condition1, condition2, condition3, condition4, cb) {
    orm.innerJoin3(colNames, table1, table2, table3, condition1, condition2, condition3, condition4, function (res) {
      cb(res);
    });
  },
  // calls UPDATE/update function in orm.js
  // passes table name, column name, value, and id
  // objColVals is object
  delete: function (table, condition, cb) {
    orm.delete(table, condition, function (res) {
      cb(res);
    });
  }
};

// makes orm accessible to endeavor_controller.js
module.exports = endeavor;