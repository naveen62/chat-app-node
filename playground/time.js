const moment = require('moment');
// var date = moment()
// date.add(100, 'year').subtract(9, 'months').subtract(1, 'days')
// console.log(date.format('MMM Do YYYY'))
var sometimeStamp = moment().valueOf()
console.log(sometimeStamp);

var createdAt = 1234
var time = moment(createdAt);
console.log(time.format('h:mm a'))
