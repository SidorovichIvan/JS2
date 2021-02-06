const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const {
    connected
} = require('process');
const {
    response
} = require('express');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
    app.options('*', (req, res) => {
        res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
        res.send();
    });
});

app.use(bodyParser.json());
app.listen(3000, () => {
    console.log('server started');

})

app.use(express.static('.'));

app.get('/data.', (req, res) => {
    fs.readFile('./JSON/catalog.json', 'utf-8', (err, data) => {
        res.send(JSON.parse(data))
    })
})

app.get('/dataCart.', (req, res) => {
    fs.readFile('./JSON/cart.json', 'utf-8', (err, data) => {
        res.send(JSON.parse(data))
    })
})

app.delete('/deleteCart.', (req, res) => {
    fs.readFile('./JSON/cart.json', 'utf-8', (err, data) => {
        const cart = JSON.parse(data);
        const item = req.body;
        const statData = {
            product: item,
            method: "deleteCart",
            time: new Date()
        };
        statistics(statData)
        cart.splice(cart.findIndex(ARRitem => ARRitem.id == item.id), 1)
        fs.writeFile('./JSON/cart.json', JSON.stringify(cart), err => {
            res.send(JSON.stringify(statData))
        })
    })
})

app.delete('/deleteCartAll.', (req, res) => {
    fs.readFile('./JSON/cart.json', 'utf-8', (err, data) => {
        let cart = JSON.parse(data);
        cart = [];
        const item = req.body;
        const statData = {
            product: item,
            method: "deleteCartAll",
            time: new Date()
        };
        statistics(statData)
        fs.writeFile('./JSON/cart.json', JSON.stringify(cart), err => {
            res.send(JSON.stringify(statData))
        })
    })
})

app.post('/addToCArt.', (req, res) => {
    fs.readFile('./JSON/cart.json', 'utf-8', (err, data) => {
        const cart = JSON.parse(data);
        const item = req.body;
        const statData = {
            product: item,
            method: "addToCart",
            time: new Date()
        };
        statistics(statData)
        cart.push(item);
        fs.writeFile('./JSON/cart.json', JSON.stringify(cart), err => {
            if (err) {
                res.send('{"result":0}')
            } else {
                res.send('{"result":1}')
            }
        })
    })
})


function statistics(item) {
    fs.readFile('./JSON/stats.json', 'utf-8', (err, data) => {
        const bigData = JSON.parse(data);
        bigData.push(item);
        fs.writeFile('./JSON/stats.json', JSON.stringify(bigData), err => {})
    })
}