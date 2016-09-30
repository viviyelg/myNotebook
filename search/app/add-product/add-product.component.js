angular.module('addProduct').
component('addProduct', {
    templateUrl: 'add-product/add-product.template.html',
    controller: ['$http', function AddProductController($http) {
        var self = this;
        self.addProduct1 = function(product) {

            // $http({
            //     method: "POST",
            //     url: "http://localhost:8800/product/product.json",
            //     data: {
            //         'productId': product.productId,
            //         'productName': product.productName,
            //         'productPrize': product.productPrize
            //     },
            //     success: function(response) {
            //         alert("添加成功");
            //     }
            // })

            $http.post('/addProduct', {
                'productId': product.productId,
                'productName': product.productName,
                'productPrize': product.productPrize
            }, { 'Content-Type': 'application/x-www-form-urlencoded' }).then(function(response) {
                alert("添加成功");
            });

        }
    }]
})
