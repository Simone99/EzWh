class testDescriptor{
    constructor(id, name, description, SKUID){
        this.id = id;
        this.name = name;
        this.description = description;
        this.SKUID = SKUID;
    }

    setName(name){
        this.name = name;
    }

    setDescription(description){
        this.description = description;
    }

    setSKUID(SKUID){
        this.SKUID = SKUID;
    }
}

module.exports = testDescriptor;