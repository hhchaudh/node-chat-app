const moment = require('moment');

// Jan 1st 1970 00:00:10 am

// let date = new Date();
// console.log(date.getMonth());
// new Date().getTime();

// let date = moment();
// console.log(date.format('MMM Do, YYYY'));

let createdAt = 1234;
let date = moment(createdAt);
console.log(date.format('LT'));