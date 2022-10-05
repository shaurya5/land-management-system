function getTimeNow() {
  return  Date.now().toString()
}

function convertUnixTime(time) {
  var date = new Date(time * 1000)
  var hours = date.getHours()
  var minutes = "0" + date.getMinutes()
  var seconds = "0" + date.getSeconds()
  var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
  
  return formattedTime
}

module.exports = {
  getTimeNow,
  convertUnixTime
}