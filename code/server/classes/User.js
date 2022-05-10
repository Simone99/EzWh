class User{
    constructor(name, surname, type, username, password, id = null) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.type = type;
        this.username = username;
        this.password = password;
    }

    setName(name) {
        this.name = name;
        return;
    }

    setSurname(surname) {
        this.surname = surname;
        return;
    }

    setUsername(username) {
        this.username = username;
        return;
    }

    setPassword(password) {
        this.password = password;
        return;
    }

    setType(type) {
        this.type = type;
        return;
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