const express = require('express');
const path = require('path');
const app = express();

app.use('/', express.static(path.join(__dirname, 'src')));
//app.use((req, res) => res.sendFile(`${__dirname}/src/index.html`));

const pg = require('pg');
const config = {
    user: 'postgres',
    password: 'caasiu',
    database: 'initdb',
    host: '153.125.234.174',
    port: 31319
};


const price2float = (rows) => {
    var result = rows.map((item) => {
        return Object.assign({}, item, {price: parseFloat(item.price)});
    });

    return result;
}

app.get('/api/product/:slug', (req, res) => {
    var client = new pg.Client(config);
    client.connect();
    client.query("select * from products where slug = $1", [req.params.slug])
        .then(result => {
            res.json(result.rows);
        }).then(() => {
            client.end();
            console.log('fetch api/product/'+ req.params.slug +' finished');
        });
});

app.get('/api/id/:num', (req, res) => {
    var client = new pg.Client(config);
    client.connect();
    client.query("select * from products where id = $1", [req.params.num.toString()])
        .then(result => {
            res.json(result.rows[0]);
        }).then(() => {
            client.end();
            console.log('fetch api/id/'+ req.params.num +' finished');
        });
})

app.get('/api/products', (req, res) => {
    var client = new pg.Client(config);
    client.connect();
    client.query("select id, label, image, slug, introduction, price, stock from products")
        .then(result => {
            res.json(price2float(result.rows));
        }).then(() => {
            client.end();
            console.log('fetch all products finished');
        });
})

app.listen(3000, () => console.log('express port is on: 3000'));
