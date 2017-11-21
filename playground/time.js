const moment = require('moment');
const events = require('events');
"use strict";
// Jan 1st 1970 00:00:10 am

// let date = new Date();
// console.log(date.getMonth());
// new Date().getTime();

// let date = moment();
// console.log(date.format('MMM Do, YYYY'));

// let createdAt = 1234;
// let date = moment(createdAt);
// console.log(date.format('LT'));

let moveQueue = [0,1,2,3,4,5,6];

const myEmitter = new events.EventEmitter();

let myTraversal = (mQueue) => {
  let c = 0;
  let traverse = () => {
    c = Math.floor(Math.random()*(mQueue.length));
    console.log(`${mQueue[c]}`);
    if(c === 5) {
      console.log('I WANT TO STOP');
      myEmitter.emit('stop');
    }
  };
  return setInterval(traverse, 200);
};

let timer = myTraversal(moveQueue);

myEmitter.on('stop', () => {
  clearInterval(timer)
});



