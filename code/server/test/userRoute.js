const {resetDB} = require('../test_modules/init_test_module');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();

const app = require('../server');
var agent = chai.request.agent(app);

describe('Test User APIs', () => {
    before(async() => {
        await resetDB('./EZWarehouseDB.db');
    });
    testGetSuppliers(200);
    testNewUser(422, "s295316@studenti.polito.it", "Simone", "Zanella", "DioMattone", "manager");
    testNewUser(201, "s295316@studenti.polito.it", "Simone", "Zanella", "DioMattone", "supplier");
    testNewUser(409, "s295316@studenti.polito.it", "Simone", "Zanella", "DioMattone", "supplier");
});

function testGetSuppliers(expectedHTTPStatus){
    it('Getting suppliers', done => {
        agent.get('/api/suppliers').then(res => {
            res.should.have.status(expectedHTTPStatus);
            done();
        });
    });
}

function testNewUser(expectedHTTPStatus, username, name, surname, password, type){
    it('Adding a new user', done => {
        const user = {
            "username" : username,
            "name" : name,
            "surname" : surname,
            "password" : password,
            "type" : type
        };
        agent.post('/api/newUser').send(user).then(res => {
            res.should.have.status(expectedHTTPStatus);
            done();
        });
    });
}