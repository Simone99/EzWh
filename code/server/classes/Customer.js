class Customer{
    constructor(name, surname){
        //TODO: when DAO is ready update this part with db queries
        this.name = name;
        this.surname = surname;
    }

    setName(name){
        this.name = name;
    }

    setSurname(surname){
        this.surname = surname;
    }

}

module.exports = Customer;