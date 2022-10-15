const { Blockchain } = require("../struct/blockchain");
const util = require("util");

function getTimeNow() {
  return Date.now().toString();
}

function convertUnixTime(time) {
  var date = new Date(time * 1000);
  var hours = date.getHours();
  var minutes = "0" + date.getMinutes();
  var seconds = "0" + date.getSeconds();
  var formattedTime =
    hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);

  return formattedTime;
}

function printBlockchain() {
  // const bc = new Blockchain()
  // console.log(util.inspect(bc, false, null, true));
}

module.exports = {
  getTimeNow,
  convertUnixTime,
  printBlockchain,
};
