<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Drag</title>
	<style>
	.box{
		width: 200px;
		height: 200px;
		position: relative;
		margin:100px;
		border: 1px solid #000; 
	}
	.box1{
		position: absolute;
		width: 100px;
		height: 100px;
		background: red;
		top: 0;
		left: 0;
	}</style>
</head>
<body>
	<div class="box">
		<div class="box1"></div>
	</div>
</body>
<script>
	window.onload=function(){
     	class Drag{
     		constructor(obj){
     			this.obj=obj.ele;
     			this.minx=obj.rect.minx;
     			this.maxx=obj.rect.maxx;
     			this.miny=obj.rect.miny;
     			this.maxy=obj.rect.maxy;
     			this.x=obj.dir.x===false?obj.dir.x:true;
     			this.y=obj.dir.y===false?obj.dir.y:true;
     			this.drag();


     		}
     		drag(){
     			var that=this;
     			this.obj.onmousedown=function(e){
                     var cx=e.clientX;
                     var cy=e.clientY;
                     var left=this.offsetLeft;
                     var top=this.offsetTop;
                     that.prex=e.clientX;
                     that.prey=e.clientY;
                     that.endx=cx-left;
                     that.endy=cy-top;
                     that.move();
                     that.up();
     			}
                       
            }
            move(){
            	var that=this;
            	document.onmousemove=function(e){
                     var cx=e.clientX;
                     var cy=e.clientY;
                     var left=cx-that.endx;
                     var top=cy-that.endy;
                     that.nextx=e.clientX;
                     that.nexty=e.clientY;
                     that.lenx=that.nextx-that.prex;
                     that.leny=that.nexty-that.prey;
                     that.prex=that.nextx;
                     that.prey=that.nexty;
                     
                     if(that.x){
                     	if(left<that.minx){
                     	    left=that.minx;
                       }
                       if(left>that.maxx-that.obj.offsetWidth){
                     	    left=that.maxx-that.obj.offsetWidth;
                       }
                     	that.obj.style.left=left+"px";
                     }
                     if(that.y){
                     	if(top<that.miny){
                     	    top=that.miny;
                       }
                       if(top>that.maxy-that.obj.offsetHeight){
                     	    top=that.maxy-that.obj.offsetHeight;
                       }
                       that.obj.style.top=top+"px";
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
            	var tx=setInterval(()=>{
            		this.lenx*=0.8;
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
            	},30)
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
            	},30)


            }
     			
     	}  
     	   var div=document.getElementsByClassName("box1")[0];
     	   console.log(div)
     	   new Drag({ele:div,rect:{minx:0,maxx:200,miny:0,maxy:200},
     	   	         dir:{x:true,y:true}
               
     	})
    }

</script>

</html>
