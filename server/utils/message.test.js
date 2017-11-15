let expect = require('expect');

let {generateMessage} = require('./message');

describe('generate message', () => {
  it('should generate the correct message object', () => {
    let from = 'Haaris Chaudhry';
    let text = 'I like chicken';
    let newMsg = generateMessage(from, text);

    expect(newMsg).toInclude({from, text});
    expect(newMsg.createdAt).toBeA('number');
  });
});