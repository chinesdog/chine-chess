
import  bg from '../img/stype_2/bg.png'

import dot from '../img/stype_2/dot.png'

import r_box from '../img/stype_2/r_box.png'
import {delay} from "./delay.js";


function draw(){

    var com=com||{}
    const path='/src/img/stype_2/'
    com.init = function (){
        com.width			=523	;		//画布宽度
        com.height			=	580; 		//画布高度
        com.spaceX			=	57;		//着点X跨度
        com.spaceY			=	57;		//着点Y跨度
        com.pointStartX		=	3;	//第一个着点X坐标;
        com.pointStartY		=	5;	//第一个着点Y坐标;


        com.canvas			=	document.getElementById("chess"); //画布
        com.ct				=	com.canvas.getContext("2d") ;
        com.canvas.width	=	com.width;
        com.canvas.height	=	com.height;

        // com.childList		=	com.childList||[];
        com.loadImages()
    }
    com.loadImages = function() {
        com.bgImg = new Image();
        com.bgImg.src  = bg
        com.img_chess={}
        for(var i in com.args){
            let t={}
            t.img = new Image();
            t.img.src=path+ com.args[i].img+'.png'
            com.img_chess[i]=t;
        }
        com.dot=new Image();
        com.dot.src=dot
        com.paneImg=new Image()
        com.paneImg.src=r_box
    }




    com.args={
        //红子 中文/图片地址/阵营/权重
        'c':{text:"车", img:'r_c', my:1 ,bl:"c"},
        'm':{text:"马", img:'r_m', my:1 ,bl:"m"},
        'x':{text:"相", img:'r_x', my:1 ,bl:"x"},
        's':{text:"仕", img:'r_s', my:1 ,bl:"s"},
        'j':{text:"将", img:'r_j', my:1 ,bl:"j"},
        'p':{text:"炮", img:'r_p', my:1 ,bl:"p"},
        'z':{text:"兵", img:'r_z', my:1 ,bl:"z"},

        //蓝子
        'C':{text:"�", img:'b_c', my:-1 ,bl:"c" },
        'M':{text:"�R", img:'b_m', my:-1 ,bl:"m"},
        'X':{text:"象", img:'b_x', my:-1 ,bl:"x" },
        'S':{text:"士", img:'b_s', my:-1 ,bl:"s" },
        'J':{text:"帅", img:'b_j', my:-1 ,bl:"j" },
        'P':{text:"炮", img:'b_p', my:-1 ,bl:"p" },
        'Z':{text:"卒", img:'b_z', my:-1 ,bl:"z" }
    };








    // 延时


    function clickEvent(e){
        console.log(e)
        var a=getClickPoint(e)
        console.log(a.x,a.y)
    }

    function  getClickPoint (e){
        var domXY = com.getDomXY(com.canvas);
        var x=Math.round((e.pageX-domXY.x-com.pointStartX-20)/com.spaceX)
        var y=Math.round((e.pageY-domXY.y-com.pointStartY-20)/com.spaceY)
        return {"x":x,"y":y}
    }
    com.getDomXY = function (dom){
        var left = dom.offsetLeft;
        var top = dom.offsetTop;
        var current = dom.offsetParent;
        while (current !== null){
            left += current.offsetLeft;
            top += current.offsetTop;
            current = current.offsetParent;
        }
        return {x:left,y:top};
    }

    com.chess=com.chess||{}
    com.chess.init=function (x,y,name){

        this.x=x;
        this.y=y;
        this.isshow=true;
        this.name=name;
        this.alpha=1;
        this.show=function (){
            if(this.isshow){
                com.ct.save()
                com.ct.globalAlpha=this.alpha
                com.ct.drawImage(com.img_chess[this.name].img,
                    com.spaceX*this.x+com.pointStartX,
                    com.spaceY*this.y+com.pointStartY)
                com.ct.restore()
            }

        }
    }

    com.init()

    delay(200).then(()=>{
        com.ct.drawImage(com.bgImg,0,0,com.width,com.height)
        // com.canvas.addEventListener("click",clickEvent);
        var s1=new com.chess.init(0,0,'s')
        var s2=new com.chess.init(0,1,'M')
        s1.show()
        s2.show()



    })

}

export {draw}
