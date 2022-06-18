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
    var obj = this._conform(message);

    this._data[this._id] = obj;
    this._id++;
  },

  _conform: function(message) {
    // ensure each message object conforms to expected shape
    message.text = message.text || '';
    message.username = message.username || '';
    message.roomname = message.roomname || '';
    message.message_id = this._id;
    return message;
  }
};

module.exports = storage;