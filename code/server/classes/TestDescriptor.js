class testDescriptor{
    constructor(name, description, SKUID){
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