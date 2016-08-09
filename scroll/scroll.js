(function(){
	// 获取每个<li>元素的高度
	var liHeight=document.querySelectorAll(".scrollUl li")[0].offsetHeight;

	function vScroll(con){
		var con={
			scrollHeight:con.scrollHeight||liHeight,
			speed:con.speed||1000
		};
		var ul=document.querySelector(".scrollUl");
		function animation(){
			ul.style.marginTop=-con.scrollHeight+"px";
			// 复制需要滑出的<li>元素，并把它们按顺序拼接在后面
			var topLi=document.querySelectorAll(".scrollUl li")[0];
			document.querySelectorAll(".scrollUl li")[0].remove();
			ul.style.marginTop=0;
			ul.appendChild(topLi);
		}
		var ani=setInterval(animation,con.speed);
		ul.addEventListener("mouseover",function(){
			clearInterval(ani);
		});
		ul.addEventListener("mouseout",function(){
			ani=setInterval(animation,con.speed);
		}); 
	}

	vScroll({});
})(window, undefined);

