var _ = require('underscore');

var storage = {
  _data: {},
  _id: 0,

  getData: function() {
    //GET request, get all data
    // var arr = [];
    // for ( let prop in this._data) {
    //   arr.push(this._data[prop]);
    // }
    // return arr;
    return _.values(this._data);
  },

  addData: function(message) {
    //POST request, add to _data
    var obj = message;

    this._data[this._id] = obj;
    this._id++;
  },
};

module.exports = storage;