const {resetDB} = require('../test_modules/init_test_module');
const SKU = require('../classes/SKU');
const SKUItem = require('../classes/SKUItem');
const User = require('../classes/User');
const Item = require('../classes/Item');
let DAO_test;

describe("get restock orders", () => {
    beforeAll(async() => {
        DAO_test = await resetDB('./EZWarehouseDB_test5.db');
        await DAO_test.insertSKU(new SKU("a new sku", 100, 50, 10.99, "first SKU", null, null, 50));
        await DAO_test.addUser(new User('Simone', 'Zanella', 'supplier', 's295316@studenti.polito.it', 'testPassword'));
        await DAO_test.addItem(new Item("a new item", 10.99, 1, 1, 12));
        await DAO_test.addRestockOrder("2021/11/29 09:33", [{"SKUId":1,"description":"a new item","price":10.99,"qty":30}], 1);
    });
    test('get restock order', async () => {
        let res = await DAO_test.getAllRestockOrders();
        expect(res).toEqual([
                {
                    "id":1,
                    "issueDate":"2021/11/29 09:33",
                    "state": "ISSUED",
                    "products": [{"SKUId":1,"description":"a new item","price":10.99,"qty":30}],
                    "supplierId" : 1,
                    "skuItems" : []
                }
            ]
        );
    });
    test('get restock order issued', async() => {
        const res = await DAO_test.getAllRestockOrdersIssued();
        expect(res).toEqual([
            {
                "id":1,
                "issueDate":"2021/11/29 09:33",
                "state": "ISSUED",
                "products": [{"SKUId":1,"description":"a new item","price":10.99,"qty":30}],
                "supplierId" : 1,
                "skuItems" : []
            }
        ]);
    });
    test('change restock order state', async () => {
        await DAO_test.editRestockOrderState(1, "DELIVERY");
        const res = await DAO_test.getRestockOrderByID(1);
        expect(res.state).toEqual("DELIVERY");
    });
    test('set SKUItems to restock order', async()=>{
        await DAO_test.editRestockOrderState(1, "DELIVERY");
        await DAO_test.editRestockOrderTransportNote(1, {deliveryDate : "2021/12/29"});
        await DAO_test.editRestockOrderState(1, "DELIVERED");
        await DAO_test.editRestockOrderSkuItems(1, [{rfid : '12345678901234567890123456789015', SKUId : 1}]);
        const res = await DAO_test.getRestockOrderByID(1);
        expect(res).toEqual({
            "id":1,
            "issueDate":"2021/11/29 09:33",
            "state": "DELIVERED",
            "products": [{"SKUId":1,"description":"a new item","price":10.99,"qty":30}],
            "supplierId" : 1,
            "skuItems" : [{rfid : '12345678901234567890123456789015', SKUId : 1}],
            "transportNote" : {"deliveryDate":"2021/12/29"}
        });
    });
    test('add restock order', async() => {
        await DAO_test.addRestockOrder("2021/11/29 09:33", undefined, 1);
        const res = await DAO_test.getRestockOrderByID(2);
        expect(res).toEqual(404);
    });
});

