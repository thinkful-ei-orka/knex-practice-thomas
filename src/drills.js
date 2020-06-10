require('dotenv').config();
const knex = require('knex');

const knexInstance = knex({
    client: 'pg',
    connection: process.env.DB_URL,
});

const searchTerm = 'Facon';

function searchList(searchTerm){
    knexInstance
        .select('*')
        .from('shopping_list')
        .where('name', 'ILIKE', `%${searchTerm}%`)
        .then(result => {
            console.log(result)
        });
};

function paginateList(pageNumber) {
    let pageLimit = 6;
    if (pageNumber < 1) {
        return;
    }
    knexInstance
        .select('*')
        .from('shopping_list')
        .limit(pageLimit)
        .offset((pageNumber - 1) * pageLimit)
        .then(result => {
            console.log(result)
        })
}

//date added is greater than days ago
function getAfterDate(daysAgo) {
    knexInstance
        .select('*')
        .from('shopping_list')
        .where(
            'date_added',
            '>',
            knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo)
        )
        .then(result => {
            console.log(result)
        })
}

function getTotalCosts() {
    knexInstance
        .select('category')
        .from('shopping_list')
        .groupBy('category')
        .sum('price AS total')
        .then(result => {
            console.log(result);
        })
}

//searchList(searchTerm);
//paginateList(4);
//getAfterDate(1);
getTotalCosts();