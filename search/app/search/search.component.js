'use strict'

angular.
module('search').
component('search', {
    templateUrl: 'search/search.template.html',
    controller: ['$http', function SearchController($http) {
        var self = this;
        var products=[];
        $http.get('product/product.json').then(function(response) {
            products = response.data;
	        self.getPrize = function(productId) {
	            if (products) {
	                for (var i = 0; i < products.length; i++) {
	                    if (products[i].productId == productId) {
	                        self.productName = products[i].productName;
	                        self.productPrize = products[i].productPrize;
	                        self.message = "";
	                        return;
	                    } else {
	                        self.message = "没有此商品信息";
	                        return;
	                    }
	                }
	            }
	        }
        });
    }]
})
