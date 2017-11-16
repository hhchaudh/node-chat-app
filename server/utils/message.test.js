"use strict";

let expect = require('expect');

let {generateMessage, generateLocationMessage} = require('./message');

describe('generate message', () => {
  it('should generate the correct message object', () => {
    let from = 'Haaris Chaudhry';
    let text = 'I like chicken';
    let newMsg = generateMessage(from, text);

    expect(newMsg).toInclude({from, text});
    expect(newMsg.createdAt).toBeA('number');
  });
});

describe('generate location message', () => {
  it('should generate correct location objeect', () => {
    let from = 'Haaris Chaudhry';
    let latitude = -23.234321964;
    let longitude = 98.43312312;
    let url = `https://www.google.com/maps?q=${latitude},${longitude}`;
    let testLocMsg = generateLocationMessage(from, latitude, longitude);

    expect(testLocMsg).toInclude({from, url});
    expect(testLocMsg.createdAt).toBeA('number');
  });
});