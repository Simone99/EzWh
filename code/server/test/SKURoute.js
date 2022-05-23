const {resetDB} = require('../test_modules/init_test_module');
const SKU = require('../classes/SKU');
const deepEqualInAnyOrder = require('deep-equal-in-any-order');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(deepEqualInAnyOrder);
chai.use(chaiHttp);
chai.should();

const app = require('../server');
const { expect } = chai;
var agent = chai.request.agent(app);

describe('Test SKU APIs', () => {
    before(async() => {
        const localDAO = await resetDB('./EZWarehouseDB.db');
        await localDAO.insertSKU(new SKU("a new sku", 100, 50, 10.99, "first SKU", null, null, 50));
    });

    testPostSKU(422, "a new sku",100, 50, "first SKU", 50); //price is missing -> validation body fails
    testPostSKU(201, "a new sku",100, 50, "first SKU", 10.99, 50)
    testGetSKUs(200, [
        {
            "id":1,
            "description" : "a new sku",
            "weight" : 100,
            "volume" : 50,
            "notes" : "first SKU",
            "position" : null,
            "availableQuantity" : 50,
            "price" : 10.99
        }    
    ]);

    testGetSKU(200, 1,
        {
            "description" : "a new sku",
            "weight" : 100,
            "volume" : 50,
            "notes" : "first SKU",
            "position" : null,
            "availableQuantity" : 50,
            "price" : 10.99
        }    
    );
    
    testPutSKU(422, 1, "a new sku", 100, 50, "first SKU", 10.99);
    testPutSKU(404, 400, "a new sku", 100, 50, "first SKU", 10.99, 48);
    testPutSKU(200, 1, "a new sku", 100, 50, "first SKU", 10.99, 44);

    testDeleteSKU(204, 3);
    
});

function testPostSKU(expectedHTTPStatus, description, weight, volume, notes, price , availableQuantity) {
    it('Adding a new SKU', done => {
        const reqBody = {
            description : description,
            weight : weight,
            volume : volume,
            notes : notes,
            price : price,
            availableQuantity : availableQuantity
        };
        agent.post('/api/sku').send(reqBody).then(res => {
            res.should.have.status(expectedHTTPStatus);
            done();
        });
    });
}


function testGetSKUs(expectedHTTPStatus, expected) {
    it('Getting skus', done => {
        agent.get('/api/skus').then(res => {
            res.should.have.status(expectedHTTPStatus);
            expect(res.body).to.not.deep.equalInAnyOrder(expected);
            done();
        });
    });
}

function testGetSKU(expectedHTTPStatus, ID, expected) {
    it('Getting sku', done => {
        agent.get(`/api/skus/${ID}`).then(res => {
            res.should.have.status(expectedHTTPStatus);
            expect(res.body).to.not.deep.equalInAnyOrder(expected);
            done();
        });
    });
}

function testPutSKU(expectedHTTPStatus, ID, newDescription, newWeight, newVolume, newNotes, newPrice , newAvailableQuantity) {
    it('Put inside sku', done => {
        agent.put(`/api/sku/${ID}`).send({
            newDescription: newDescription, 
            newWeight: newWeight, 
            newVolume: newVolume, 
            newNotes: newNotes, 
            newPrice:newPrice , 
            newAvailableQuantity:newAvailableQuantity
        }).then( res => {
            res.should.have.status(expectedHTTPStatus);
            done();            
        });
    });
}

function testDeleteSKU(expectedHTTPStatus, id) {
    it('Delete sku', done => {
        agent.delete(`/api/skus/${id}`).then( res => {
            res.should.have.status(expectedHTTPStatus);
            agent.get(`/api/sku/${id}`).then(res2 => {
                expect(res2.body).to.deep.equalInAnyOrder({});
                done();
            })
        });
    });
}