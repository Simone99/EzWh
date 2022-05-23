const DAO = require('../classes/DAO');
const Item = require('../classes/Item');
const { resetDB } = require('../test_modules/init_test_module');
let DAO_test;

describe('Tests on ItemDAO.js', () => {
	beforeEach(async () => {
		DAO_test = await resetDB('./EZWarehouseDB_test.db');
		await DAO_test.addItem(new Item('Item description 1', 150, 1, 2));
		await DAO_test.addItem(new Item('Item description 2', 200, 2, 4));
		await DAO_test.addItem(new Item('Item description 3', 250, 3, 5));
	});

	test('add item', async () => {
		let item = new Item('Item description', 100, 1, 1);
		let res = await DAO_test.addItem(item);
		expect(res).toEqual(201);
	});

	test('add duplicate item', async () => {
		let item = new Item('Item description 1', 150, 1, 2);
		let res = await DAO_test.addItem(item);
		expect(res).toEqual(422);
	});

	test('get an item by id', async () => {
		let res = await DAO_test.getItemById(1);
		expect(res).toEqual({
			id: 1,
			price: 150,
			SKUId: 2,
			supplierID: 1,
			description: 'Item description 1',
		});
	});

	test('get a non existing item by id', async () => {
		let res = await DAO_test.getItemById(10);
		expect(res).toEqual(undefined);
	});

	test('get all items', async () => {
		let res = await DAO_test.getAllItems();
		expect(res).toEqual([
			{
				id: 1,
				price: 150,
				SKUId: 2,
				supplierID: 1,
				description: 'Item description 1',
			},
			{
				id: 2,
				price: 200,
				SKUId: 4,
				supplierID: 2,
				description: 'Item description 2',
			},
			{
				id: 3,
				price: 250,
				SKUId: 5,
				supplierID: 3,
				description: 'Item description 3',
			},
		]);
	});

	test('Edit an existing item', async () => {
		let res = await DAO_test.editItem(2, 'Item description 7', 90);
		expect(res).toEqual('ok');
	});

	test('Control content after editing an existing item', async () => {
		await DAO_test.editItem(2, 'Item description 7', 90);
		let res = await DAO_test.getItemById(2);
		expect(res).toEqual({
			id: 2,
			price: 90,
			SKUId: 4,
			supplierID: 2,
			description: 'Item description 7',
		});
	});

	test('Edit a non existing item', async () => {
		let res = await DAO_test.editItem(15, 'Item description 3', 190);
		expect(res).toEqual(404);
	});

	test('delete an item', async () => {
		let res = await DAO_test.deleteItem(2);
		expect(res).toEqual('ok');
	});

	test('check existance of deleted item', async () => {
		await DAO_test.deleteItem(2);
		let res = await DAO_test.getAllItems();
		expect(res).toEqual([
			{
				id: 1,
				price: 150,
				SKUId: 2,
				supplierID: 1,
				description: 'Item description 1',
			},
			{
				id: 3,
				price: 250,
				SKUId: 5,
				supplierID: 3,
				description: 'Item description 3',
			},
		]);
	});
});
