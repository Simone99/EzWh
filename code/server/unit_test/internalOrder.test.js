const {resetDB} = require('../test_modules/init_test_module');
const SKU = require('../classes/SKU');
const SKUItem = require('../classes/SKUItem');
const User = require('../classes/User');
let DAO_test;

describe('get internal orders', () => {
    beforeAll(async() => {
        DAO_test = await resetDB('./EZWarehouseDB_test4.db');
        await DAO_test.insertSKU(new SKU("a new sku", 100, 50, 10.99, "first SKU", null, null, 50));
        await DAO_test.addSKUItem(new SKUItem(1, 1, "2021/11/29 12:30", '12345678901234567890123456789015'));
        await DAO_test.addUser(new User('Simone', 'Zanella', 'customer', 's295316@studenti.polito.it', 'testPassword'));
        await DAO_test.addInternalOrder("2021/11/29 09:33", [{"SKUId":1,"description":"a product","price":10.99,"qty":3}], 1);
    });

    test('get internal orders', async() => {
        const res = await DAO_test.getInternalOrdersList();
        expect(res).toEqual([
                {
                    "id":1,
                    "issueDate":"2021/11/29 09:33",
                    "state": "ISSUED",
                    "products": [{"SKUId":1,"description":"a product","price":10.99,"qty":3}],
                    "customerId" : 1
                }
            ]
        );
    });

    test('get internal orders issued', async() => {
        const res = await DAO_test.getInternalOrdersIssuedList();
        expect(res).toEqual([
                {
                    "id":1,
                    "issueDate":"2021/11/29 09:33",
                    "state": "ISSUED",
                    "products": [{"SKUId":1,"description":"a product","price":10.99,"qty":3}],
                    "customerId" : 1
                }
            ]
        );
    });

    test('get insternal orders accepted', async() => {
        const res = await DAO_test.getInternalOrdersAcceptedList();
        expect(res).toEqual([]);
    });

    test('editing internal order', async() => {
        await DAO_test.editInternalOrder(1, "COMPLETED", [{"SkuID":1,"RFID":"12345678901234567890123456789015"}]);
        const res = await DAO_test.getInternalOrder(1);
        expect(res).toEqual({
                "id":1,
                "issueDate":"2021/11/29 09:33",
                "state": "COMPLETED",
                "products": [{"SkuID":1,"RFID":"12345678901234567890123456789015"}],
                "customerId" : 1
            }
        );
    });
    test('add internal order', async() => {
        const res = await DAO_test.addInternalOrder("2021/11/29 09:33", undefined, 1);
        expect(res).toEqual(404);
    });
});