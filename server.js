const express = require('express');
const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const APP_PORT = 3000;
const REST_PORT = 8080;


// restful endpoint 
const restServer = express()
const crypto = require('crypto');
const sqlite3 = require('sqlite3').verbose();
const jwt = require('jsonwebtoken');
const expressJWT = require('express-jwt');

const generateHash = (data) => {
    return crypto.createHash('md5')
        .update(data)
        .digest('hex');
}

var productETag;
restServer.get('/product/:slug', (req, res) => {
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

restServer.get('/id/:num', (req, res) => {
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
restServer.get('/products', (req, res) => {
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

restServer.post('/userid/:id/password/:pwd', (req, res) => {
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

restServer.get('/account',
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

restServer.listen(REST_PORT, () => {
    `Restful Server is running on http://localhost:${REST_PORT}`;
})


const config = require("./webpack.config.js");
const compiler = webpack(config);

const app = new WebpackDevServer(compiler, {
    contentBase: "/src/",
    hot: true,
    historyApiFallback: true,
    proxy: {'/api/**': {
        target: `http://localhost:${REST_PORT}`,
        secure: false,
        pathRewrite: {'^/api': ''}
    }},
    stats: {colors: true}
});

//serve static resources
app.use('/', express.static(path.join(__dirname, 'src')));
app.listen(APP_PORT, () => {
    console.log(`App is running on http://localhost:${APP_PORT}`);
})
