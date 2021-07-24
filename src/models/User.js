const fs = require('fs');
const path = require('path');
const userFilePath = path.join(__dirname, '../database/usuariosDatos.json');
const users = JSON.parse(fs.readFileSync(userFilePath, 'utf-8'));

const User = {

    getData: function (){
        return users
    },

    generateId: function(){
        let allUsers = this.findAll();
        let lastUser = allUsers.pop();
        if (lastUser) {
        return lastUser.id + 1;
        }
        return 1;
    },

    findAll: function (){
        return this.getData();
    },

    findByPk: function (id) {
        let allUsers = this.findAll();
        let userFound = allUsers.find(oneUser => oneUser.id === id);
        
        return userFound;
    },

    create: function (userData) {
        let allUsers = this.findAll();
        let newUser = {
            id: this.generateId(),
            ...userData
        }
        allUsers.push(newUser);
        fs.writeFileSync(userFilePath, JSON.stringify(allUsers, null, ' '));
        return true;
    },

    delete: function(id){
        let allUsers = this.findAll();
        let finalUsers = allUsers.filter(oneUser => oneUser.id !== id);
        fs.writeFileSync(userFilePath, JSON.stringify(finalUsers, null, ' '));

        
    }
}

//console.log(User.findByPk(2));
console.log(User.create({nombre: 'Luccaasdaaa', email: 'lucsdaca@', }));
//console.log(User.findAll());
//console.log(User.generateId());
//console.log(User.delete(6));

module.exports = User;