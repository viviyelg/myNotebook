angular.
  module('core.product').
  factory('Product', ['$resource', 
  	function($resource){
  	return $resource('product/product.json',{},{
  		query:{
  			method:'GET',
  			params:{},
  			isArray:true
  		}
  	})
  }])