var connection = require('./connection.js');

// this function creates question marks for each value going into DB
// called from create function below
function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push('?');
  }

  return arr.toString();
}

// creates name value pair for column in DB
// called from update function below
function objToSql(ob) {
  // column1=value, column2=value2,...
  var arr = [];

  for (var key in ob) {
    if (ob.hasOwnProperty(key)) {
      arr.push(key + '=' + ob[key]);
    }
  }

  return arr.toString();
}

// creates name value pair for column in DB ("with quotes")
// called from update function below
function objToSqlString(ob) {
  // column1=value, column2=value2,...
  var arr = [];

  for (var key in ob) {
    if (ob.hasOwnProperty(key)) {
      arr.push(key + '=' + '"' + ob[key] + '"');
    }
  }

  //console.log(arr);
  return arr;
}

// object containing MySQL queries
var orm = {
  // selects all rows from DB table
  all: function (tableInput, cb) {
    var queryString = 'SELECT * FROM ' + tableInput + ';';
    connection.query(queryString, function (err, result) {
      if (err) throw err;
      cb(result);
    });
  },
  // selects all rows from DB table
  allWhere: function (table, condition, cb) {
    var queryString = 'SELECT * FROM ' + table + ' ';

    queryString = queryString + ' WHERE ';
    queryString = queryString + condition;

    console.log(queryString);

    connection.query(queryString, function (err, result) {
      if (err) throw err;
      cb(result);
    });
  },
    // vals is an array of values that we want to save to cols
    // cols are the columns we want to insert the values into
    // insert into DB as prepared statement using parameters passed in
  create: function (table, cols, vals, cb) {
    var queryString = 'INSERT INTO ' + table;

    queryString = queryString + ' (';
    queryString = queryString + cols.toString();
    queryString = queryString + ') ';
    queryString = queryString + 'VALUES (';
    queryString = queryString + printQuestionMarks(vals.length);
    queryString = queryString + ');';

    console.log(queryString);
    // console.log(cols.toString());
    // console.log(vals.toString());

    connection.query(queryString, vals, function (err, result) {
      if (err) throw err;
      cb(result);
      console.log(vals);
    });
  },
    // objColVals would be the columns and values that you want to update
    // an example of objColVals would be {name: Big Mac, devoured: true}
  // distinct: function (table, col, cb) {
  //  var queryString = 'SELECT DISTINCT ';
  //   queryString = queryString + col.toString();
  //   queryString = queryString + ' FROM ' + table;
  //   console.log(queryString);
  //   connection.query(queryString, function (err, result) {
  //     if (err) throw err;
  //     cb(result);
  //   });
  // },
    // objColVals would be the columns and values that you want to update
    // an example of objColVals would be {name: Big Mac, devoured: true}
  update: function (table, objColVals, condition, cb) {
    var queryString = 'UPDATE ' + table;

    queryString = queryString + ' SET ';
    queryString = queryString + objToSql(objColVals);
    queryString = queryString + ' WHERE ';
    queryString = queryString + condition;

    console.log(queryString);
    connection.query(queryString, function (err, result) {
      if (err) throw err;
      cb(result);
    });
  },
    // objColVals would be the columns and values that you want to update
    // an example of objColVals would be {name: Big Mac, devoured: true}
  updateString: function (table, objColVals, condition, cb) {
    var queryString = 'UPDATE ' + table;

    queryString = queryString + ' SET ';
    queryString = queryString + objToSqlString(objColVals);
    queryString = queryString + ' WHERE ';
    queryString = queryString + condition;

    console.log(queryString);
    connection.query(queryString, function (err, result) {
      if (err) throw err;
      cb(result);
    });
  },
};

// makes orm accessible to endeavor.js
module.exports = orm;