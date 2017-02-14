/**
 * Created by lenovo on 2017/2/14.
 */
//拖拽：面向对象的方式；边界控制，方向控制，动画控制（拖动速度快的话有动画效果）
//  arguments:{
//    selector:selector  必填
//    边界控制：range.{minx:,miny:,maxx:,maxy:}
//             range:document  initialize
//             range:false    不判断边界
//             range:true     相对于它定位的那个父元素判断边界
//    方向控制：dir.{x:true/false,y:true/false}  initialize:all true
//    动画控制：animate:true/false   initialize:true
//  }


class Drag{

    constructor (obj){
        // 获取元素
        this.elems=document.querySelectorAll(obj.selector);
        this.eleparent=this.elems[0].offsetParent;

        //参数初始化
        this.animate=obj.animate===false?obj.animate:true;

        //边界初始化
        this.rangeInitialize(obj);

        // 判断方向
        if(obj.dir===undefined){
            obj.dir={x:true,y:true}
        }else{
            this.dirx=obj.dir.x===false?obj.dir.x:true;
            this.diry=obj.dir.y===false?obj.dir.y:true;
        }

        //console.log(this.elems.length);
        //开启拖拽
        this.startDarg();

    }

    //边界初始化
    rangeInitialize(obj){
        if(obj.range==false){
            return;
        }else if(obj.range==true){
            this.minx=0;
            this.miny=0;
            this.maxx=this.eleparent.clientWidth;
            this.maxy=this.eleparent.clientHeight;
        }else if(obj.range==document||obj.range===undefined){
            this.minx=-this.eleparent.offsetLeft;
            this.miny=-this.eleparent.offsetTop;
            this.maxx=document.documentElement.clientWidth-this.eleparent.offsetLeft-this.eleparent.clientLeft;
            this.maxy=document.documentElement.clientHeight-this.eleparent.offsetTop-this.eleparent.clientTop;
        }else{
            this.minx=obj.range.minx===undefined?null:obj.range.minx;
            this.miny=obj.range.miny===undefined?null:obj.range.miny;
            this.maxx=obj.range.maxx===undefined?null:obj.range.maxx;
            this.maxy=obj.range.maxy===undefined?null:obj.range.maxy;
        }
    }

    // 开始拖拽
    startDarg(){
        var that=this;
        for(var i=0;i<this.elems.length;i++){
            this.elems[i].onmousedown=function(e){
                //阻止浏览器的默认事件
                e.preventDefault();

                var ex= e.clientX;
                var ey= e.clientY;

                //当前盒子距离定位的父元素的距离
                var ox=this.offsetLeft;
                var oy=this.offsetTop;
                // 事件源到文档的距离 - 盒子到有定位的父元素的距离。这个长度是固定的
                this.lenx=ex-ox;
                this.leny=ey-oy;
                that.move(this);
                that.up(this);

                //开始的时候鼠标的位置
                this.prex=ex;
                this.prey=ey;

               /* that.lenx=0;
                that.leny=0;*/

            }
        }
    }

    move(obj){
        var that=this;
        window.onmousemove=function(e){
            //阻止浏览器的默认事件
            e.preventDefault();

            //事件源到文档的距离 - 长度 = 盒子应该距离定位的父元素的距离
            obj.left= e.clientX-obj.lenx;
            obj.top= e.clientY-obj.leny;

            //移动后鼠标的位置
            obj.nextx= e.clientX;
            obj.nexty= e.clientY;
            obj.stepx=obj.nextx-obj.prex;
            obj.stepy=obj.nexty-obj.prey;

            //判断边界
            that.rangeDarg(obj);
            that.dirDarg(obj);

        }
    }

    // 鼠标抬起注销事件
    up(obj){
        var that=this;
        window.onmouseup=function(){
            window.onmousemove=null;
            if(that.animate==true){
                that.animatefun(obj);
            }
            window.onmouseup=null;

        }
    }

    //判断边界
    rangeDarg(obj){
        if(this.minx!==null&&obj.left<this.minx){
            obj.left=this.minx;
        }
        if(this.miny!==null&&obj.top<this.miny){
            obj.top=this.miny;
        }
        if(this.maxx!==null&&obj.left>this.maxx-obj.offsetWidth){
            obj.left=this.maxx-obj.offsetWidth;
        }
        if(this.maxy!==null&&obj.top>this.maxy-obj.offsetHeight){
            obj.top=this.maxy-obj.offsetHeight;
        }
    }

    //判断方向
    dirDarg(obj){
        if(this.dir){
            if(this.dirx){
                obj.style.left=obj.left+"px";
            }
            if(this.diry){
                obj.style.top=obj.top+"px";
            }
        }else{
            obj.style.left=obj.left+"px";
            obj.style.top=obj.top+"px";
        }
    }

    //动画效果
    animatefun(obj){
        var xishu=0.5;
        var that=this;
        var t=setInterval(function(){
            obj.stepx=obj.stepx*xishu;
            obj.stepy=obj.stepy*xishu;

            if(obj.lenx>=1||obj.leny>=1){
                obj.left+=obj.stepx;
                obj.top+=obj.stepy;
                that.rangeDarg(obj);
                that.dirDarg(obj);
            }else{
                clearInterval(t);
            }

        },50);
    }
}



new Drag(
    {   selector:".box"
    }
);


