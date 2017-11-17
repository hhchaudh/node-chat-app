"use strict";

const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {

  let users;

  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Mike',
      room: 'Node Course'
    }, {
      id: '2',
      name: 'Jen',
      room: 'React Course'
    }, {
      id: '3',
      name: 'Julie',
      room: 'Node Course'
    }];
  });

  it('should add new user', () => {
    let users = new Users();
    let user = {
      id: 123,
      name: 'Jimmy',
      room: 'The escape room'
    };

    users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
  });

  it('should return names for node course', () => {
    let userList = users.getUserList('Node Course');

    expect(userList).toEqual(['Mike', 'Julie']);
  });

  it('should return names for react course', () => {
    let userList = users.getUserList('React Course');

    expect(userList).toEqual(['Jen']);
  });

  it('should remove a user', () => {
    let expectedUserList = users.users.filter((user) => {
      return user.id !== '1';
    });

    users.removeUser('1');

    expect(users.users).toEqual(expectedUserList);
  });

  it('should not remove a user', () => {
    let userId = '4';
    let removedUser = users.removeUser(userId);

    expect(removedUser).toNotExist();
  });

  it('should find a user', () => {
    let userId = '2';
    let expectedUser = users.getUser(userId);

    expect(expectedUser.id).toBe(userId);
  });

  it('should not find a user', () => {
    let userId = '99';
    let expectedUser = users.getUser(userId);

    expect(expectedUser).toNotExist();
  });
});