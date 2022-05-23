const SKU = require('../classes/SKU');
const SKUItem = require('../classes/SKUItem');
const {resetDB} = require('../test_modules/init_test_module');
let DAO_test;

describe("get return orders", () => {
    beforeEach(async() => {
        DAO_test = await resetDB('./EZWarehouseDB_test40.db');
        await DAO_test.insertSKU(new SKU("a new sku", 100, 50, 10.99, "first SKU", null, null, 50));
        await DAO_test.insertSKU(new SKU("another sku", 100, 50, 10.99, "first SKU", null, null, 50));
        const item1 = new SKUItem(1, 0, "2021/11/29 12:30", "12345678901234567890123456789015");
        const item2 = new SKUItem(1, 0, "2021/11/29 12:30", "12345678901234567890123456789016");

        await DAO_test.addSKUItem(item1);
        const skuItemList = [];
        skuItemList.push(item1);
        await DAO_test.addReturnOrder(1, skuItemList, "2021/11/29 09:33")
    });
    test('get return orders', async () => {
        let res = await DAO_test.getReturnOrderList();
        expect(res).toEqual([
            {
            returnDate:"2021/11/29 09:33",
            products: [{"SKUId":1,"description":"a new sku","price":10.99, "RFID":"12345678901234567890123456789015"}],
            restockOrderId: 1
            }
        ]);
    });
});

describe("get return order", () => {
    beforeEach(async() => {
        DAO_test = await resetDB('./EZWarehouseDB_test41.db');
        await DAO_test.insertSKU(new SKU("a new sku", 100, 50, 10.99, "first SKU", null, null, 50));
        await DAO_test.insertSKU(new SKU("another sku", 100, 50, 10.99, "first SKU", null, null, 50));
        const item1 = new SKUItem(1, 0, "2021/11/29 12:30", "12345678901234567890123456789015");
        const item2 = new SKUItem(1, 0, "2021/11/29 12:30", "12345678901234567890123456789016");

        await DAO_test.addSKUItem(item1);
        const skuItemList = [];
        skuItemList.push(item1);
        await DAO_test.addReturnOrder(1, skuItemList, "2021/11/29 09:33")
    });
    test('get return order', async () => {
        let res = await DAO_test.getReturnOrder(1);
        expect(res).toEqual(
            {
            returnDate:"2021/11/29 09:33",
            products: [{"SKUId":1,"description":"a new sku","price":10.99, "RFID":"12345678901234567890123456789015"}],
            restockOrderId: 1
            }
        );
    });

});

