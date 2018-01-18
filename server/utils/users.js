class Users {
    constructor() {
        this.users = []
    }
    addUser(id, name, room) {
        var user = {
            id,
            name,
            room
        }
        this.users.push(user)
        return user
    }
    getUserList(room) {
        var users = this.users.filter((user) => {
            return user.room == room
        })
        var namesArray = users.map((user) => {
            return user.name
        }) 
        return namesArray
    }
    removeUser(id) {
        var returnUser = this.users.filter((user) => {
            return user.id == id
        })
        // this has has removed obj from useres
        var removedUser = this.users.filter((user) => {
            return user.id != id  
        })
        this.users = removedUser;
        return returnUser[0]
        
    }
    getUser(id) {
        var getUser = this.users.filter((user) => {
            return user.id == id
        })
        return getUser[0]
    }
}
module.exports = {
    Users
}




// class Person {
//     constructor(name, age) {
//         this.name = name;
//         this.age = age
//     }
//     getUserDescription() {
//         return `${this.name} is ${this.age} old`
//     }
// }
// var me = new Person('naveen', 20);
// var desc = me.getUserDescription()
// console.log(desc)