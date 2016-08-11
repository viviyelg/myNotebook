 // 扩展参数，可传入任意滚动高度。
 // 待解决：流畅滚动效果
(function(){
	// 获取每个<li>元素的高度
	var liHeight=document.querySelectorAll(".scrollUl li")[0].offsetHeight;

	function vScroll(con){
		if(!con) con={};
		con={
			scrollHeight:con.scrollHeight||liHeight,
			speed:con.speed||1000
		};
		var ul=document.querySelector(".scrollUl");
		// 取余
		var remains=remain=con.scrollHeight%liHeight;
		function animation(){
			ul.style.marginTop=(-con.scrollHeight+ul.style.marginTop)+"px";
			// 复制需要滑出的<li>元素，并把它们按顺序拼接在后面
			// 自定义高度时,若不等于每个li元素的整数倍，只取整数部分
			var liNum=parseInt(con.scrollHeight/liHeight);

			for(var i=0;i<liNum;i++){
				var topLi=document.querySelectorAll(".scrollUl li")[0];
				document.querySelectorAll(".scrollUl li")[0].remove();
				ul.appendChild(topLi);
			}
			if(remains==0){
				return;
			}
			if(remains%liHeight!=0){
				ul.style.marginTop=-remains+"px";
				remains+=remain;
			}else{
				var topLi=document.querySelectorAll(".scrollUl li")[0];
				document.querySelectorAll(".scrollUl li")[0].remove();
				ul.style.marginTop=0+"px";
				remains=remain;
				ul.appendChild(topLi);
			}
		}
		var ani=setInterval(animation,con.speed);
		ul.addEventListener("mouseover",function(){
			clearInterval(ani);
		});
		ul.addEventListener("mouseout",function(){
			ani=setInterval(animation,con.speed);
		});
	}

	vScroll({scrollHeight:70});
})(window, undefined);
