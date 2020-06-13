const ShoppingListService = {
    getAllShoppingItems(knex) {
        return knex.select('*').from('shopping_list')
    },
    addShoppingItem(knex, shoppingItem) {
        return knex
            .insert(shoppingItem)
            .into('shopping_list')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    getById(knex, id) {
        return knex
            .from('shopping_list')
            .select('*')
            .where('id', id)
            .first()

    },
    updateShoppingItem(knex, id, newItem) {
        return knex('shopping_list')
            .where({id})
            .update(newItem)
    },
    deleteShoppingItem(knex, id) {
        return knex('shopping_list')
            .where({id})
            .delete()
    }
    
}

module.exports = ShoppingListService;