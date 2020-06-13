const ShoppingListService = require('../src/shopping-list-service')
const knex = require('knex')

describe('Shopping List object', function () {
    let db;
    let testItems = [{
        id: 1,
        name: "Fish tricks",
        price: "13.10",
        date_added: new Date("2020-05-19 16:40:39"),
        checked: false,
        category: "Main"
    },
    {
        id: 2,
        name: "Not Dogs",
        price: "4.99",
        date_added: new Date("2020-05-19 16:40:39"),
        checked: true,
        category: "Snack"
    },
    {
        id: 3,
        name: "Buffalo Wings",
        price: "5.59",
        date_added: new Date("2020-05-19 16:40:39"),
        checked: false,
        category: "Snack"
    }]

    before(() => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL,
        })
    })

    before(() => db('shopping_list').truncate());
    afterEach(() => db('shopping_list').truncate());

    after(() => db.destroy())

    context('Given this test runs', () => {
        it('Should run', () => {
            expect(true).to.eql(true);
        })
    })

    context(`Given 'shopping_list' has data`, () => {
        beforeEach(() => {
            return db
                .into('shopping_list')
                .insert(testItems)
        })

        it(`getAllShoppingItems() resolves all items from 'shopping_list' table`, () => {
            return ShoppingListService.getAllShoppingItems(db)
                .then(actual => {
                    expect(actual).to.eql(testItems)
                })
        })

        it(`addShoppingItem() inserts a new item and resolves the new item with an 'id'`, () => {
            const newItem = {
                name: "Milkshakes",
                price: "3.99",
                date_added: new Date("2020-05-19 16:40:39"),
                checked: false,
                category: "Snack"
            }
            return ShoppingListService.addShoppingItem(db, newItem)
                .then(actual => {
                    expect(actual).to.eql({
                        id: 1,
                        name: newItem.name,
                        price: newItem.price,
                        date_added: newItem.date_added,
                        checked: newItem.checked,
                        category: newItem.category
                    })
                })
        })

        it(`getById() gets an specific item in 'shopping_list'`, () => {
            const itemToGet = 3;
            const itemTest = testItems[itemToGet - 1];
            return ShoppingListService.getById(db, itemToGet)
                .then(actual => {
                    expect(actual).to.eql({
                        id: itemToGet,
                        name: itemTest.name,
                        price: itemTest.price,
                        date_added: itemTest.date_added,
                        checked: itemTest.checked,
                        category: itemTest.category
                    })
                })
        })

        it(`updateShoppingItem() gets and updates an item in 'shopping_list'`, () => {
            const itemToUpdate = 3;
            const newItemData = {
                name: 'Borgers',
                price: '6.99',
                date_added: new Date(),
                checked: false,
                category: "Main"
            }
            return ShoppingListService.updateShoppingItem(db, itemToUpdate, newItemData)
                .then(() => ShoppingListService.getById(db, itemToUpdate))
                .then(actual => {
                    expect(actual).to.eql({
                        id: itemToUpdate,
                        ...newItemData
                    })
                })
        })

        it(`deleteShoppingItem() removes an item from 'shopping_list'`, () => {
            const itemId = 3;
            return ShoppingListService.deleteShoppingItem(db, itemId)
                .then(() => ShoppingListService.getAllShoppingItems(db))
                .then(allItems => {
                    const expected = allItems.filter(item => item.id !== itemId)
                    expect(allItems).to.eql(expected)
                })
        })
    })
})

context(`Given 'shopping_list' has no data`, () => {

})
