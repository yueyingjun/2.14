<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
    <title>Document</title>
</head>
<style>



    .parent{
        width: 400px;
        height: 400px;
        border:1px solid #000;
        position: relative;
        left: 0;top:0;
        margin: 0 auto;
    }
    .son{
        width: 100px;
        height: 100px;
        background: dodgerblue;
        position: absolute;
    }
</style>
<body>
<div class="parent">
    <div class="son"></div>
</div>
</body>
<script>

    function drag(obj){
        this.obj=obj.ele;
        this.minx=obj.rect.minx;
        this.maxx=obj.rect.maxx;
        this.miny=obj.rect.miny;
        this.maxy=obj.rect.maxy;
        this.dirx=obj.dir.x===false? obj.dir.x:true;
        this.diry=obj.dir.y===false? obj.dir.y:true;
        this.yizi=0.8;
        this.prex=0;
        this.prey=0;
        this.nextx=0;
        this.nexty=0;
        this.down();
    }
    drag.prototype={
        down:function(){
            var that=this;
            this.obj.onmousedown=function(e){
                var left=this.offsetLeft;
                var top=this.offsetTop;
                var cx=e.clientX;
                var cy=e.clientY;
                that.x=cx-left;
                that.y=cy-top;
                that.move();
                that.up();
            }
        },
        move:function(){
            var that=this;
            document.onmousemove=function(e){
                var cx=e.clientX;
                var cy=e.clientY;
                var left=cx-that.x;
                var top=cy-that.y;
                if(left<that.minx){left=that.minx};
                if(left>that.maxx-that.obj.offsetWidth){left=that.maxx-that.obj.offsetWidth};
                if(top<that.miny){top=that.miny};
                if(top>that.maxy-that.obj.offsetHeight){top=that.maxy-that.obj.offsetHeight};
                if(that.dirx){
                    that.obj.style.left=left+"px";
                }
                if(that.diry){
                    that.obj.style.top=top+"px";
                }
                that.nextx=left;
                that.nexty=top;
                that.lenx=that.nextx-that.prex;
                that.leny=that.nexty-that.prey;
                that.prex=that.nextx;
                that.prey=that.nexty;
            }
        },
        up:function(){
            document.onmouseup=()=>{
                document.onmousemove=null;
                document.onmouseup=null;
                this.animate();
            }
        },
        animate:function(){
            var t=setInterval(()=>{
                this.lenx*=this.yizi;
            this.leny*=this.yizi;
            var x=this.lenx+this.obj.offsetLeft;
            var y=this.leny+this.obj.offsetTop;

            if(x<this.minx){x=this.minx};
            if(x>this.maxx-this.obj.offsetWidth){x=this.maxx-this.obj.offsetWidth};
            if(y<this.miny){y=this.miny};
            if(y>this.maxy-this.obj.offsetHeight){y=this.maxy-this.obj.offsetHeight};

            if(Math.abs(this.lenx)>=Math.abs(this.leny)){
                if(Math.abs(this.lenx)<=1){
                    clearInterval(t);
                }
            }else{
                if(Math.abs(this.leny)<=1){
                    clearInterval(t);
                }
            }
            if(this.dirx){
                this.obj.style.left=x+"px";
            }
            if(this){
                this.obj.style.top=y+"px";
            }
        },50)
        }
    }
    var son=document.querySelector(".son");
    new drag({ele:son,rect:{minx:0,maxx:400,miny:0,maxy:400},dir:{x:true,y:true}})
</script>
</html>
