const expect = require('expect');
const {Users} = require('./users');
 
describe('Users', () => {
    var users;

    beforeEach(() => {
        users = new Users()
        users.users = [
            {
                id: '1',
                name: 'naveen',
                room: 'Node course'
            },
            {
                id: '2',
                name: 'Jen',
                room: 'Node course'
            },
            {
                id: '3',
                name: 'mike',
                room: 'React course'
            }
        ]
    })
    it('should add new user', () => {
        var users = new Users()
        var user = {
            id: '123',
            name: 'naveen',
            room: 'The office fans'
        }
        var resUser = users.addUser(user.id, user.name, user.room)
        
        expect(users.users).toEqual([user])
    })
    it('should return names for node course', () => {
        var userList = users.getUserList('Node course')
        expect(userList).toEqual(['naveen', 'Jen']);
    })
    it('should return names for React course', () => {
        var userList = users.getUserList('React course')
        expect(userList).toEqual(['mike'])
    })
    it('should remove a user', () => {
        var removedUser = users.removeUser('2');
        expect(removedUser).toInclude({
            name: 'Jen'
        })
        expect([removedUser]).toExclude(users.users)
        expect(users.users.length).toBe(2)
    })
    it('should not remove user', () => {
        var removedUser = users.removeUser('10')
        expect(removedUser).toNotExist();
        expect(users.users.length).toBe(3)
    })
    it('should find a user', () => {
        var getUser = users.getUser('1');
        expect(getUser).toInclude({
            name: 'naveen'
        })
    })
    it('should not find user', () => {
        var getUser = users.getUser('10');
        expect(getUser).toBe(undefined)      
    })
})