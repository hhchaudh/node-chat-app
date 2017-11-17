"use strict";

const expect = require('expect');

let {isRealString} = require('./validation');
describe('isRealString', () => {
  it('should reject non-string values', () => {
    expect(isRealString(123)).toBe(false);
  });
  it('should reject strings with only spaces', () => {
    expect(isRealString('    ')).toBe(false);
  });
  it('should allow strings with non-space characters', () => {
    expect(isRealString('I like chicken')).toBe(true);
  });
});