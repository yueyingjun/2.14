<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<style>
		*{
			list-style: none;
			margin: 0;
			padding: 0;
		}
		.box{
			width: 100px;
			height: 100px;
			background: red;
			position: relative;
			margin: 50px;
		}
		.son{
			width: 50px;
			height: 50px;
			background: yellow;
			position: absolute;
			left: 10px;
		}
		.son.a{
			top: 0px;
		}
		.son.b{
			top: 60px;
		}
		.son.c{
			top: 120px;
		}
		.son.d{
			top: 180px;
		}
	</style>
</head>

<body>
	<div class="box">
		<div class="son a"></div>
		<div class="son b"></div>
		<div class="son c"></div>
		<div class="son d"></div>
	</div>
</body>
<script>
	class Drag{
		constructor (obj){
			// this.obj=document.querySelectorAll(selector);
			this.obj=obj.ele;
			this.minx=obj.rect.minx;
			this.miny=obj.rect.miny;
			this.maxx=obj.rect.maxx;
			this.maxy=obj.rect.maxy;
			this.x=obj.dir.x===false?obj.dir.x:true;
			this.y=obj.dir.y===false?obj.dir.y:true;
			this.drag();

		}
		drag(){
			var that=this;		
			this.obj.onmousedown=function(e){
				var ev=e||window.event;
				var cx=ev.clientX;
				var cy=ev.clientY;
				var ol=this.offsetLeft;
				var ot=this.offsetTop;
				that.prex=e.clientX;
                that.prey=e.clientY;
				that.endx=cx-ol;
				that.endy=cy-ot;
				that.move(this);
				that.up();
				e.preventDefault();
			}
		}				
		move(obj){
			var that=this;
			document.onmousemove=function(e){
				var eve=e||window.event;
				that.cx=eve.clientX;
				that.cy=eve.clientY;
				that.left=that.cx-that.endx;
				that.top=that.cy-that.endy;
				that.nextx=e.clientX;
                that.nexty=e.clientY;
                that.lenx=that.nextx-that.prex;
                that.leny=that.nexty-that.prey;
                that.prex=that.nextx;
                that.prey=that.nexty;
                if(that.x){
                	if(that.left<=that.minx){
					that.left=that.minx;
					}
					if(that.left>=that.maxx-that.obj.offsetWidth){
						that.left=that.maxx;
					}
					obj.style.left=that.left+"px";
                }
				if(that.y){
					if(that.top<=that.miny){
						that.top=that.miny;
					}				
					if(that.top>=that.maxy-that.obj.offsetHeight){
						that.top=that.maxy;
					}					
					obj.style.top=that.top+"px";
				}
				e.preventDefault();
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
			var tx=setInterval(()=>{
            		this.lenx*=0.5;
            		if(this.lenx<1){
            			clearInterval(tx);
            		}else{
            			var left = this.obj.offsetLeft+this.lenx;
            			if(left<this.minx){
                     	   left=this.minx;
                        }
                        if(left>this.maxx-this.obj.offsetWidth){
                     	   left=this.maxx-this.obj.offsetWidth;
                       }
            			this.obj.style.left=left+"px";

            		}
            	},50)
            	var ty=setInterval(()=>{
            		this.leny*=0.8;
            		if(this.leny<1){
            			clearInterval(ty);
            		}else{
            			var top=this.obj.offsetTop+this.leny;
            		    if(top<this.miny){
                     	   top=this.miny;
                       }
                       if(top>this.maxy-this.obj.offsetHeight){
                     	  top=this.maxy-this.obj.offsetHeight;
                       }
            			this.obj.style.top=top+"px";

            		}
            	},50)


            }
     			
     	}  
     	   var div=document.getElementsByClassName("son")[0];
     	   new Drag({ele:div,rect:{minx:0,maxx:500,miny:0,maxy:500},
     	   	         dir:{x:true,y:true}
     	   	     })
</script>
</html>
