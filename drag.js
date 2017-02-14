/**
 * Created by lenovo on 2017/2/14.
 */
//��ק���������ķ�ʽ���߽���ƣ�������ƣ��������ƣ��϶��ٶȿ�Ļ��ж���Ч����
//  arguments:{
//    selector:selector  ����
//    �߽���ƣ�range.{minx:,miny:,maxx:,maxy:}
//             range:document  initialize
//             range:false    ���жϱ߽�
//             range:true     ���������λ���Ǹ���Ԫ���жϱ߽�
//    ������ƣ�dir.{x:true/false,y:true/false}  initialize:all true
//    �������ƣ�animate:true/false   initialize:true
//  }


class Drag{

    constructor (obj){
        // ��ȡԪ��
        this.elems=document.querySelectorAll(obj.selector);
        this.eleparent=this.elems[0].offsetParent;

        //������ʼ��
        this.animate=obj.animate===false?obj.animate:true;

        //�߽��ʼ��
        this.rangeInitialize(obj);

        // �жϷ���
        if(obj.dir===undefined){
            obj.dir={x:true,y:true}
        }else{
            this.dirx=obj.dir.x===false?obj.dir.x:true;
            this.diry=obj.dir.y===false?obj.dir.y:true;
        }

        //console.log(this.elems.length);
        //������ק
        this.startDarg();

    }

    //�߽��ʼ��
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

    // ��ʼ��ק
    startDarg(){
        var that=this;
        for(var i=0;i<this.elems.length;i++){
            this.elems[i].onmousedown=function(e){
                //��ֹ�������Ĭ���¼�
                e.preventDefault();

                var ex= e.clientX;
                var ey= e.clientY;

                //��ǰ���Ӿ��붨λ�ĸ�Ԫ�صľ���
                var ox=this.offsetLeft;
                var oy=this.offsetTop;
                // �¼�Դ���ĵ��ľ��� - ���ӵ��ж�λ�ĸ�Ԫ�صľ��롣��������ǹ̶���
                this.lenx=ex-ox;
                this.leny=ey-oy;
                that.move(this);
                that.up(this);

                //��ʼ��ʱ������λ��
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
            //��ֹ�������Ĭ���¼�
            e.preventDefault();

            //�¼�Դ���ĵ��ľ��� - ���� = ����Ӧ�þ��붨λ�ĸ�Ԫ�صľ���
            obj.left= e.clientX-obj.lenx;
            obj.top= e.clientY-obj.leny;

            //�ƶ�������λ��
            obj.nextx= e.clientX;
            obj.nexty= e.clientY;
            obj.stepx=obj.nextx-obj.prex;
            obj.stepy=obj.nexty-obj.prey;

            //�жϱ߽�
            that.rangeDarg(obj);
            that.dirDarg(obj);

        }
    }

    // ���̧��ע���¼�
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

    //�жϱ߽�
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

    //�жϷ���
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

    //����Ч��
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


