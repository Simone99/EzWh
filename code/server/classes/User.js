class User{
    constructor(name, surname, type, username, password, id = null) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.type = type;
        this.username = username;
        this.password = password;
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getSurname() {
        return this.surname;
    }

    getType() {
        return this.type;
    }

    getUsername() {
        return this.username;
    }

    getPassword() {
        return this.password;
    }
}

module.exports = User;