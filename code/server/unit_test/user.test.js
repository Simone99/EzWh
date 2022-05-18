const User = require('../classes/User');
const {resetDB} = require('../test_modules/init_test_module');
let DAO_test;

describe("get user", () => {
    beforeEach(async() => {
        DAO_test = await resetDB('./EZWarehouseDB_test.db');
        await DAO_test.addUser(new User('Simone', 'Zanella', 'manager', 's295316@studenti.polito.it', 'DioMattone'));
        await DAO_test.addUser(new User('Alfredo', 'Paolino', 'manager', 'sXXXXXX@studenti.polito.it', 'DioCancro'));
    });
    test('get User', async () => {
        let res = await DAO_test.getUser('s295316@studenti.polito.it', 'manager');
        expect(res).toEqual({
            id: 1,
            name: 'Simone',
            surname: 'Zanella',
            email: 's295316@studenti.polito.it',
            password: 'DioMattone',
            type: 'manager'
        });
    });
    test('get User null', async () => {
        const res = await DAO_test.getUser(null, null);
        expect(res).toEqual(undefined);
    });
});

describe("get users not managers", () => {
    beforeEach(async() => {
        DAO_test = await resetDB('./EZWarehouseDB_test.db');
        await DAO_test.addUser(new User('Simone', 'Zanella', 'manager', 's295316@studenti.polito.it', 'DioMattone'));
        await DAO_test.addUser(new User('Alfredo', 'Paolino', 'supplier', 'sXXXXXX@studenti.polito.it', 'DioCancro'));
    });

    test('get Users', async () => {
        let res = await DAO_test.getAllUsers();
        expect(res).toEqual(
        [
            {
                id: 2,
                name: 'Alfredo',
                surname: 'Paolino',
                email: 'sXXXXXX@studenti.polito.it',
                password: 'DioCancro',
                type: 'supplier'
            }
        ]);
    });
});

describe("get suppliers", () => {
    beforeEach(async() => {
        DAO_test = await resetDB('./EZWarehouseDB_test.db');
        await DAO_test.addUser(new User('Simone', 'Zanella', 'supplier', 's295316@studenti.polito.it', 'DioMattone'));
        await DAO_test.addUser(new User('Alfredo', 'Paolino', 'supplier', 'sXXXXXX@studenti.polito.it', 'DioCancro'));
    });

    test('get suppliers', async () => {
        let res = await DAO_test.getAllSuppliers();
        expect(res).toEqual(
        [
            {
                id: 1,
                name: 'Simone',
                surname: 'Zanella',
                email: 's295316@studenti.polito.it',
                password: 'DioMattone',
                type: 'supplier'
            },
            {
                id: 2,
                name: 'Alfredo',
                surname: 'Paolino',
                email: 'sXXXXXX@studenti.polito.it',
                password: 'DioCancro',
                type: 'supplier'
            }
        ]);
    });

});


