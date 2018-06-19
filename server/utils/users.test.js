const expect = require('expect');
const {Users} = require('./users');

describe('Users Tests',() => {

var users;

beforeEach(() => {

users = new Users();

users.users = [{
    id:'id1',
    name:'name',
    room:'rooms'
},{
    id:'id2',
    name:'name2',
    room:'room'
},{
    id:'id3',
    name:'name3',
    room:'room'
}];

});

it('should add new User', () => {
var users = new Users();
var user ={
    id:'561',
    name:'sree',
    room:'First'
};
var response = users.addUser(user.id,user.name,user.room);
expect(users.users).toEqual([user]);
});

it('should remove a user', () => {
    var userId = 'id2';
    var user = users.removeUser(userId);
    expect(user.id).toBe(userId);
    expect(users.users.length).toBe(2);
});


it('should not remove a user', () => {
    var userId = '99';
    var user = users.getUser(userId);
    expect(user).toBeFalsy
    expect(users.users.length).toBe(3);
});


it('should find a user', () => {
var userId = 'id1';
var user = users.getUser(userId);
expect(user.id).toBe(userId);
});

it('should not find a user', () => {
    var userId = '99';
    var user = users.getUser(userId);
    expect(user).toBeFalsy
});

it('should return names of  room', () => {
    var userList = users.getUsersList('room');
    expect(userList).toEqual(['name2','name3']);
});


it('should return names of  rooms', () => {
    var userList = users.getUsersList('rooms');
    expect(userList).toEqual(['name']);
});

});