const express = require('express');


const app = express();

const server = app.listen(process.env.PORT || 3000, listen);

function listen() {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Example app listening at http://' + host + ':' + port);
}

app.use(express.static('public'));

let bodyParser = require('body-parser');

let products = [
{
    id: 1,
    name: 'laptop',
    quantity: 15
},
{
    id: 2,
    name: 'microwave',
    quantity: 7
},
{
    id: 3,
    name: 'mouse',
    quantity: 20
}
];

let currentId = 3;





app.use(bodyParser.json());

app.get('/products', function(req, res) {
    res.send({ products: products });
});

app.post('/products', function(req, res) {
    let productName = req.body.name;
    currentId++;

    products.push({
        id: currentId,
        name: productName,
        quantity: 1
    });

    res.send('Successfully created product!');
});



app.put('/products/:id', function(req, res) {
    let id = req.params.id;
    let newName = req.body.newName;

    let found = false;

    products.forEach(function(product, index) {
        if (!found && product.id === Number(id)) {
            product.name = newName;
        }
    });
    console.log("PUT");
    res.send('Succesfully updated product!');
});

app.post('/products/quantity/:id', function(req, res) {
    
    let id = req.params.id;
    let found = false;
    
    
    products.forEach(function(product, index) {
        
        console.log("ID " + product.id);
        console.log("NUM " + Number(id));
        if (!found && product.id === Number(id)) {
            
            let quantity = product.quantity;
            quantity++;
            product.quantity = quantity;
            
        }
    });
    console.log(products);
    res.send(products);
});

app.post('/products/down/:id', function(req, res) {
    
    let id = req.params.id;
    let found = false;
    
    
    products.forEach(function(product, index) {
        
        if (!found && product.id === Number(id)) {
            
            let quantity = product.quantity;
            quantity--;
            product.quantity = quantity;
            
        }
        if (product.quantity < 0) product.quantity = 0; 
    });
    
    res.send(products);
});

app.delete('/products/:id', function(req, res) {
    let id = req.params.id;

    let found = false;

    products.forEach(function(product, index) {
        if (!found && product.id === Number(id)) {
            products.splice(index, 1);
        }
    });

    res.send('Successfully deleted product!');
});





// Register a callback function to run when we have an individual connection
// This is run for each individual user that connects



//io.sockets.in(actualRoom).emit('joinedRoom', player, message);