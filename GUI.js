var highlightMovesBenign="pink";
var highlightMovesMalicious="#8A1919";
const table=document.querySelector("#container");
addTransformManager(table);

var chessBoard=document.createElement("div");
chessBoard.id="chessBoard";
chessBoard.innerHTML+=`<svg height="0" width="640" id="Shockwave_canvas">
<circle id="shock" cx="0" cy="0" r="0" stroke="none" stroke-width="3" fill-opacity="0.5" fill="red" />
Shockwave emission is unsupported on this device  
</svg>`;
let sqs=new Array();
for(let i=0;i<8;i++)
{
    let arr=new Array();
    for(let j=0;j<8;j++)
    {
        let sq=document.createElement("div");
        sq.style.transitionProperty="background-color";
        sq.className="boardSquares";
        sq.id="square"+i+"_"+j;
        if((i+j)%2==0)
        {
            sq.style.backgroundColor=blackSquares;
            sq.revert=function()
            {
                this.style.backgroundColor=this.highlightedForMoves&&movestart?this.highlightedForMoves:blackSquares;
            }
        }
        else
        {
            sq.style.backgroundColor=whiteSquares;
            sq.revert=function()
            {
                this.style.backgroundColor=this.highlightedForMoves&&movestart?this.highlightedForMoves:whiteSquares;
            }
            
        }
        sq.purpose="";
        chessBoard.append(sq);
        arr.push(sq);
    }
    sqs.push(arr);
}
let blood=document.createElement("img");
blood.id="bloodSplash";
let img1=new Image();
img1.src="Images/blood1.png";
let img2=new Image();
img2.src="Images/blood2.png";
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
            if(!l.purpose=="")
            return;
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
/**
 * 
 * @param {x:Number,y:Number,color:String,purpose:String} loc 
 */
chessBoard.highlight=function(loc)
{
    try
    {
        sqs[loc.y][loc.x].style.backgroundColor=loc.color;
        sqs[loc.y][loc.x].purpose=loc.purpose;

    }
    catch(outofbound){}
    
}
chessBoard.clear=function(purpose)
{
    sqs.forEach(function(k,i)
    {
        k.forEach(function(l,j)
        {
            if(purpose==l?.purpose)
            {
                l.purpose="";
                if((i+j)%2==0)
                {
                    l.style.backgroundColor=blackSquares;
                    
                    
                }
                else
                {
                    l.style.backgroundColor=whiteSquares;
                    
                }
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
    transition-duration: 1.5s;
    transition-property: transform;
    `;
}
document.body.appendChild(table);




var labelW=document.createElement("label");
//labelW.style.left=window.innerWidth/2+320+30+"px";
//labelW.style.top="100px";
labelW.style.width="300px";
labelW.innerHTML="White";
labelW.className="playerLabel";

var labelB=document.createElement("label");
//labelB.style.left=window.innerWidth/2-320-330+"px";
//labelB.style.top="100px";
labelB.style.width="300px";
labelB.innerHTML="Black";
labelB.className="playerLabel";

function popOnHover(e)
{
    e.target.move(e.target.translateCoords.x,e.target.translateCoords.y-15);
    //e.target.style.filter="drop-shadow(5px 5px 10px black)";
}
function endHover(e)
{
    e.target.move(e.target.translateCoords.x,e.target.translateCoords.y+15);
    //e.target.style.filter="none";
}
// labelB.addEventListener("mouseenter",popOnHover);
// labelB.addEventListener("mouseleave",endHover);
// labelW.addEventListener("mouseenter",popOnHover);
// labelW.addEventListener("mouseleave",endHover);
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
        if(x>7||y>7||x<0||y<0)
        return;
        if(this.x==x  &&  this.y==y)
        return;
        this.x=x;
        this.y=y;
        this.prev?.revert()
        this.prev=sqs[y][x];
        if(!this.prev.highlightedForMoves)
        {
            this.prev=null;
            return;
        }
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
            this.prev?.revert();
            this.prev=null;
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
for(let i=0;i<16;i++)
{
    let k=document.createElement("img");
    k.style.opacity="0";
    k.src=img1.src;
    blackGraveyard.append(k);
    k=document.createElement("img");
    k.style.opacity="0";
    k.src=img2.src;
    whiteGraveyard.append(k);
}




var colorSelector=document.createElement("input");
colorSelector.id="colorSelector";
colorSelector.type="color";
colorSelector.value=whiteSquares;
colorSelector.innerHTML="Color";
sidebar.appendChild(colorSelector);