 function draw(){
    const path="../img/stype_2/";
    var com=com||{}

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

        com.childList		=	com.childList||[];


        com.loadImages();

    }

    com.loadImages = function() {
        console.log("加载图片")
        com.bgImg = new Image();
        com.bgImg.src  = path+"bg.png"
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
         'C':{text:"�", img:'b_c', my:-1 ,bl:"c",},
         'M':{text:"�R", img:'b_m', my:-1 ,bl:"m",},
         'X':{text:"象", img:'b_x', my:-1 ,bl:"x", },
         'S':{text:"士", img:'b_s', my:-1 ,bl:"s", },
         'J':{text:"帅", img:'b_j', my:-1 ,bl:"j", },
         'P':{text:"炮", img:'b_p', my:-1 ,bl:"p", },
         'Z':{text:"卒", img:'b_z', my:-1 ,bl:"z", }
     };



    com.init()
}












export {draw}
