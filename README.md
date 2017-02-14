<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">

<html lang="en">

<head>

	<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">

	<title>拖拽内部盒子</title>

	<style>

	*{

		padding: 0px;

		margin: 0px;

	}

		.parent{

			width: 200px;

			height: 200px;

			border: 1px solid red;

			margin: 100px;

			position: relative;

		}

		.son{

			width: 100px;

			height: 100px;

			background-color: blue;

			position: absolute;

			left: 0px;

			top: 0px;

		}

	</style>

</head>

<body>

	<div class="parent">

		<div class="son">

			

		</div>

	</div>

</body>

<script>

	document.addEventListener("DOMContentLoaded",function(){

		var son=document.getElementsByTagName("div")[1];

		class drug{

			constructor(obj){

				this.obj=obj.ele;

				this.minx=obj.rect.minx||null;

				this.maxx=obj.rect.maxx||null;

				this.miny=obj.rect.miny||null;

				this.maxy=obj.rect.maxy||null;

				this.x=obj.dre.x===false?obj.dre.x:true;

				this.y=obj.dre.y===false?obj.dre.y:true;

				this.startdrug();

			}

			startdrug(){

				var that=this;

				this.obj.onmousedown=function(e){

					var ox=this.offsetLeft;

					var oy=this.offsetTop;

					var cx=e.clientX;

					var cy=e.clientY;

					that.prex=e.clientX;

					that.prey=e.clientY;

					that.lenx=cx-ox;

					that.leny=cy-oy;

					that.move();

					that.up();

				}

			}

			move(){

				var that=this;

				document.onmousemove=function(e){

					var cx=e.clientX;

					var cy=e.clientY;

					that.nextx=e.clientX;

					that.nexty=e.clientY;

					that.endx=that.nextx-that.prex;

					that.endy=that.nexty-that.prey;

					that.left=cx-that.lenx;

					that.top=cy-that.leny;

					if(that.left<that.minx){

						that.left=that.minx;

					}

					if(that.left>that.maxx-that.obj.offsetWidth){

						that.left=that.maxx-that.obj.offsetWidth;

					}

					if(that.top<that.miny){

						that.top=that.miny;

					}

					if(that.top>that.maxy-that.obj.offsetHeight){

						that.top=that.maxy-that.obj.offsetHeight;

					}

					if(that.x){

						that.obj.style.left=that.left+"px";

					}

					if(that.y){

						that.obj.style.top=that.top+"px";

					}

				}

			}

			up(){

				var that=this;

				document.onmouseup=function(){

					document.onmousemove=null;

					document.onmouseup=null;

					that.animate();

				}

			}

			animate(){

				var that=this;

				var yinzi=0.8;

				var t1=setInterval(function(){

					that.endx*=yinzi;

					var nowleft=that.obj.offsetLeft+that.endx;

					if(Math.abs(that.endx)<1){

					clearInterval(t1);

					}else{

						if(nowleft<that.minx){

						nowleft=that.minx;

						}

						if(nowleft>that.maxx-that.obj.offsetWidth){

							nowleft=that.maxx-that.obj.offsetWidth;

						}

						if(that.x){

						that.obj.style.left=nowleft+"px";

						}

					}

				},50)

				var t2=setInterval(function(){

					that.endy*=yinzi;

					var nowtop=that.obj.offsetTop+that.endy;

					if(Math.abs(that.endy)<1){

					clearInterval(t2);

					}else{

						if(nowtop<that.miny){

							nowtop=that.miny;

						}

						if(nowtop>that.maxy-that.obj.offsetHeight){

							nowtop=that.maxy-that.obj.offsetHeight;

						}

						if(that.y){

						that.obj.style.top=nowtop+"px";

						}

					}

				},50)

				

				

			}

		}

		new drug({ele:son,rect:{minx:0,maxx:200,miny:0,maxy:200},dre:{x:true,y:true}});

	})

</script>

</html>
