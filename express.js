const express = require('express');
const path = require('path');
const app = express();
const crypto = require('crypto');
const sqlite3 = require('sqlite3').verbose();
const jwt = require('jsonwebtoken');
const expressJWT = require('express-jwt');

app.use('/', express.static(path.join(__dirname, 'src')));
//app.use((req, res) => res.sendFile(`${__dirname}/src/index.html`));

const generateHash = (data) => {
    return crypto.createHash('md5')
        .update(data)
        .digest('hex');
}

var productETag;
app.get('/api/product/:slug', (req, res) => {
    if (!productETag || req.headers["if-none-match"] !== productETag){
        var db = new sqlite3.Database('products.db');
        db.all('select * from products where slug = ?', [req.params.slug], (err, rows) => {
            if (err) throw err;
            productETag = generateHash(Buffer.from(rows));
            res.set({"ETag": productETag});
            res.json(rows);
        });
        db.close((err) => {
            if (err) throw err;
            console.log('fetch api/product/'+ req.params.slug +' finished');
        });
    }else{
        // Here is using HTTP Cache to avoid refetching database
        console.log("product "+ req.params.slug +" is using browser cache");
        res.set({"ETag": productETag});
        res.send();
    }
});

app.get('/api/id/:num', (req, res) => {
    var db = new sqlite3.Database('products.db');
    db.get('select * from products where id = ?', [req.params.num], (err, row) => {
        if (err) throw err;
        res.json(row);
    });
    db.close((err) => {
        if (err) throw err;
        console.log('fetch api/id/'+ req.params.num +' finished');
    });
})

var rowsETag;
app.get('/api/products', (req, res) => {
    if (!rowsETag || req.headers["if-none-match"] !== rowsETag){
        var db = new sqlite3.Database('products.db');
        db.all('select * from products', (err, rows) => {
            if (err) throw err;
            rowsETag = generateHash(Buffer.from(rows));
            res.set({"ETag": rowsETag});
            res.json(rows);
        });
        db.close((err) => {
            if (err) throw err;
            console.log("fetch all products finished");
        });
    } else {
        // Here is using HTTP Cache to avoid refetching database
        console.log("products list is using browser cache")
        res.set({"ETag": rowsETag});
        res.send();
    }
})

app.post('/api/userid/:id/password/:pwd', (req, res) => {
    if(req.params.id === '348689' && req.params.pwd === 'onlineretail'){
        var token = jwt.sign({
            userid: req.params.id,
            name: 'caasiu',
        }, 'caasiu online-retail demo');
        res.send(token);
    }else{
        res.sendStatus(401);
    }
})

app.get('/api/account',
    expressJWT({secret: 'caasiu online-retail demo'}),
    (req, res) => {
        if(!req.user) return res.sendStatus(401);
        res.json({
            userid: req.user.userid,
            name: req.user.name,
            address: 'NO 3, Street 7',
            balance: 200
        });
    }
)

app.listen(3000, () => console.log('express port is on: 3000'));
