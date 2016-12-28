const express = require('express');
const path = require('path');
const app = express();
const crypto = require('crypto');

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

const generateHash = (data) => {
    return crypto.createHash('md5')
        .update(data)
        .digest('hex');
}

var productETag;
app.get('/api/product/:slug', (req, res) => {
    if (!productETag || req.headers["if-none-match"] !== productETag){
        var client = new pg.Client(config);
        client.connect();
        client.query("select * from products where slug = $1", [req.params.slug])
            .then(result => {
                productETag = generateHash(Buffer.from(result.rows));
                res.set({"ETag": productETag});
                res.json(result.rows);
            }).then(() => {
                client.end();
                console.log('fetch api/product/'+ req.params.slug +' finished');
            });
    }else{
        // Here is using HTTP Cache to avoid refetching database
        console.log("product data is using browser cache")
        res.set({"ETag": productETag});
        res.send();
    }
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

var rowsETag;
app.get('/api/products', (req, res) => {
    if (!rowsETag || req.headers["if-none-match"] !== rowsETag){
        var client = new pg.Client(config);
        client.connect();
        client.query("select id, label, image, slug, introduction, price, stock from products")
            .then(result => {
                rowsETag = generateHash(Buffer.from(result.rows));
                res.set({"ETag": rowsETag});
                res.json(price2float(result.rows));
            }).then(() => {
                client.end();
                console.log('fetch all products finished');
            });
    } else {
        // Here is using HTTP Cache to avoid refetching database
        console.log("products list is using browser cache")
        res.set({"ETag": rowsETag});
        res.send();
    }
})

app.listen(3000, () => console.log('express port is on: 3000'));
