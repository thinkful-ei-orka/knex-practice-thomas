const knex = require('knex');

const knexInstance = knex({
    client: 'pg',
    connection: 'postgresql://dunder_mifflin@localhost/knex-practice',
})

// const query = knexInstance('amazong_products')
//     .select('*')
//     .then(result => {
//         console.log(result)
//     })

knexInstance
    .select('product_id', 'name', 'price', 'category')
    .from('amazong_products')
    .where({name: 'Point of view gun' })
    .then(result => {
        console.log(result)
    })

console.log('knex and driver installed correctly');