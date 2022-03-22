
var table=document.querySelector("#container");
addTransformManager(table);
table.rotated=false;
var chessBoard=document.createElement("div");
chessBoard.id="chessBoard";
let sqs=new Array();
for(let i=0;i<8;i++)
{
    let arr=new Array();
    for(let j=0;j<8;j++)
    {
        let sq=document.createElement("div");
        if(mode)
        sq.style.transitionProperty="background-color";
        else
        sq.style.transitionProperty="none";
        sq.className="boardSquares";
        sq.id="square"+i+"_"+j;
        if((i+j)%2==0)
        {
            sq.style.backgroundColor=blackSquares;
            sq.revert=function()
            {
                this.style.backgroundColor=blackSquares;
            }
        }
        else
        {
            sq.style.backgroundColor=whiteSquares;
            sq.revert=function()
            {
                this.style.backgroundColor=whiteSquares;
            }
            
        }
        chessBoard.append(sq);
        arr.push(sq);
    }
    sqs.push(arr);
}
let blood=document.createElement("img");
let img1=new Image();
img1.src="MediaResources/blood1.png";
let img2=new Image();
img2.src="MediaResources/blood2.png";
blood.style=
`position:absolute;
z-index=2;
width:80px;
height:80px;
border-radius:15px;
`;
addTransformManager(blood);
chessBoard.refresh=function()
{
    sqs.forEach(function(k,i)
    {
        k.forEach(function(l,j)
        {
            
            if((i+j)%2==0)
            {
                l.style.backgroundColor=blackSquares;
                
            }
            else
            {
                l.style.backgroundColor=whiteSquares;
                
            }
        })
    })
    
}
chessBoard.width=640;
chessBoard.height=640;
addTransformManager(chessBoard);
table.appendChild(chessBoard);




if(mode)
{
    table.style=`
    width:100vw;
    height:100vh;
    position:relative;
    transform-origin: 50vw 50vh;
    transition-duration: 0s;
    transition-property: transform;
    `;
}
document.body.appendChild(table);




var labelW=document.createElement("label");
//labelW.style.left=window.innerWidth/2+320+30+"px";
//labelW.style.top="100px";
labelW.style.width="300px";
labelW.innerHTML="White";
labelW.style.backgroundColor="black";

var labelB=document.createElement("label");
//labelB.style.left=window.innerWidth/2-320-330+"px";
//labelB.style.top="100px";
labelB.style.width="300px";
labelB.innerHTML="Black";
labelB.style.backgroundColor="black";

addTransformManager(labelW);
addTransformManager(labelB);
table.appendChild(labelW);
table.appendChild(labelB);

const tentativeMove=
{
    x:0,
    y:0,
    listen:false,
    kill:false,
    prev:null,
    prevCol:null,
    color:null,
    greenCol:"#2ae7a2",
    redCol:"red",
    setXY:function(x,y)
    {
        if(!this.listen)
        return;
        if(this.x==x  &&  this.y==y)
        return;
        this.x=x;
        this.y=y;
        if(this.prev)
        this.prev.revert()
        this.prev=sqs[y][x];
        if(BOARD[x][y]==null)
        {
            this.color=this.greenCol;
        }
        else
        {
            this.color=this.redCol;
        }
        this.prev.style.backgroundColor=this.color;
    },
    setListen:function(yes)
    {
        this.listen=yes;
        if(!yes)
        {
            this.prev.revert();
        }
    }
}

document.body.addEventListener("click",function(e)
{
    if(sidebar.expanded  &&  e.clientY>250)
    {
        sidebar.hide();
        sidebar.expanded=false;
    }
});



var blackGraveyard=document.createElement("div");
var whiteGraveyard=document.createElement("div");
blackGraveyard.className="graveyard";
whiteGraveyard.className="graveyard";
table.append(blackGraveyard);
table.append(whiteGraveyard);
addTransformManager(blackGraveyard);
addTransformManager(whiteGraveyard);




var colorSelector=document.createElement("input");
colorSelector.id="colorSelector";
colorSelector.type="color";
colorSelector.value=whiteSquares;
colorSelector.innerHTML="Color";
sidebar.appendChild(colorSelector);