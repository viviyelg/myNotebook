var fs = require('fs');
var app=require('express')();
var bodyParser=require('body-parser');
var multer=require('multer');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data

app.post('/addProduct', function (req, res) {
	console.log(req.body);
  res.json(req.body);
	/*fs.readFile('product/product.json', function(err, data) {
        if (err) throw err;
        var oldProducts = [];
        if (data) {
            oldProducts = JSON.parse(data);
        }
        var n = { productId: '12555', pppdd: '222' };
        oldProducts.push(n);
        console.log(oldProducts);
    fs.writeFile('product/product.json',JSON.stringify(oldProducts));
    });*/
  
})

