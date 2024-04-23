
import  bg from '../img/stype_2/bg.png'

import dot from '../img/stype_2/dot.png'

import r_box from '../img/stype_2/r_box.png'
import {delay} from "./delay.js";

import {socketStore} from "../plugins/socketStore.js";

function draw(){

    var com=com||{}
    const path='/src/img/stype_2/'
    let black_off=0
    let red_off=0
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
        com.hand=1
        com.state="prepare"
        com.last_location={
            x:0,
            y:0
        }
        com.move_chess=""

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
        //
        com.chess_Set={}
        com.panel_Set=[]
        com.ta=[]

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

    com.initMap = [
        ['C0','M0','X0','S0','J0','S1','X1','M1','C1'],
        ['', '',   '' ,    '',  ''  ,   '' , ''   , ''   ,''    ],
        [   '' ,'P0',   '' , ''   ,  ''  ,   '' , ''   ,'P1', ''   ],
        ['Z0',   '' ,'Z1',  ''  ,'Z2', ''   ,'Z3', ''   ,'Z4'],
        [   '' ,   '' ,  ''  ,  ''  , ''   ,  ''  ,   '' , ''   , ''   ],
        [    '',  ''  , ''   , ''   , ''   ,''    , ''   , ''   ,''    ],
        ['z0',    '','z1',  ''  ,'z2',  ''  ,'z3', ''   ,'z4'],
        [    '','p0',  ''  ,  ''  ,  ''  ,    '',  ''  ,'p1',  ''  ],
        [    '',  ''  , ''   ,''    , ''   ,  ''  , ''   , ''   , ''   ],
        ['c0','m0','x0','s0','j0','s1','x1','m1','c1']
    ];

    function getnames(e){

        for(let i in com.chess_Set){
            let name=i
            let x=com.chess_Set[i].x
            let y=com.chess_Set[i].y
            let state=com.chess_Set[i].isshow
            if(e.x===x&&y===e.y&&state==true){
                return name;
            }
        }
        return null;
    }


    function del_chess(name){
        com.chess_Set[name].isshow=false

    }
    function move(name,new_x,new_y){
        if(com.panel_Set[new_y][new_x]===0)return
        let x=com.last_location.x
        let y=com.last_location.y
        com.chess_Set[name].x=new_x
        com.chess_Set[name].y=new_y
        com.ta[y][x]=""
        com.ta[new_y][new_x]=name
    }

    com.update=function (){
        com.ct.clearRect(0, 0, com.width, com.height);
        com.ct.drawImage(com.bgImg,0,0,com.width,com.height)
        for(var i in com.chess_Set){
            com.chess_Set[i].show()
        }
        for(let i=0;i<10;i++){
            for(let j=0;j<9;j++){
                if(com.panel_Set[i][j]===1){
                    com.drawPanel(j,i)
                }
            }
        }


    }


    com.set_dot=function (arr){
        for(let i=0;i<10;i++){
            for(let j=0;j<9;j++){
                com.panel_Set[i][j]=0
            }
        }

        for(let i=0;i<arr.length;i++){
            let item=arr[i]
            com.panel_Set[item.y][item.x]=1
        }

    }




    function getMove(x,y,name){
        let ch=name.substring(0,1)

        if(ch==='z'||ch==='Z'){
            let available= com.z(x,y)
            return available
        }
        return []
    }



    function clickEvent(e){

        var a=getClickPoint(e)
        let name=getnames(a);

        if(com.state=="running"){
            let movechess=com.move_chess
            com.chess_Set[movechess].alpha=1.0

            move(movechess, a.x,a.y)

            socketStore.socket.send(JSON.stringify({
                event:socketStore.status

            }))
            com.set_dot([])
            com.update()
            com.state="prepare"

        }
        else if(com.state=="prepare"){
            com.chess_Set[name].alpha=0.4

            let arr=getMove(a.x,a.y,name)

            com.set_dot(arr)
            com.update()
            com.state="running"
            com.last_location=a
            com.move_chess=name
        }

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
        this.alpha=1.0;
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

    com.drawPanel=function (x,y){
        com.ct.save()
        com.ct.drawImage(com.dot,
            com.spaceX*x+com.pointStartX,
            com.spaceY*y+com.pointStartY)
        com.ct.restore()
    }



    com.valid=function (x,y){
        return x>=0&&x<9&&y>=0&&y<10;
    }

    com.z=function (x,y){
        console.log(x,y)
        var res=[]
        if(y<=4){
            if(x-1>=0&&com.ta[y][x-1]===""){
                res.push({x:x-1,y:y})
            }
            if(x+1<9&&com.ta[y][x+1]===""){
                res.push({x:x+1,y:y})
            }
        }
        if(y-1>=0 &&com.ta[y-1][x]===""){
            res.push({x:x,y:y-1})
        }
        return res;

    }

    com.init()

    delay(200).then(()=>{
        com.ct.drawImage(com.bgImg,0,0,com.width,com.height)

        for(let i=0;i<10;i++){
            com.panel_Set[i]=new Array()
            for(let j=0;j<9;j++){
                com.panel_Set[i][j]=0
            }
        }

        for(let i=0;i<com.initMap.length;i++){
            for(let j=0;j<com.initMap[i].length;j++){



                if(com.initMap[i][j]==="")continue
                let c=com.initMap[i][j].substring(0,1)
                let index=com.initMap[i][j]
                if(com.hand===1){
                    com.chess_Set[index]=new com.chess.init(j,i,c)
                }
                else {
                    com.chess_Set[index]=new com.chess.init(j,9-i,c)
                }
            }
        }
        com.canvas.addEventListener('click',clickEvent)
        com.ta=com.initMap
        for(let i in com.chess_Set){
            com.chess_Set[i].show()
        }
    })

}

export {draw}
