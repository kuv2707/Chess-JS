let switchTurn;
if(mode)
{
    
    switchTurn=function()
    {
        turn=!turn;
        let deg;
        if(turn)
        deg=0;
        else
        deg=180;
        
        labelW.style.color=labelActive;
        labelB.style.color=labelInactive;
        
        table.style.transform=`rotate(${deg}deg)`;
        labelB.style.transform=`rotate(${deg}deg)`;
        labelW.style.transform=`rotate(${deg}deg)`;
        for(let i=0;i<Pieces.length;i++)
        {
            
            if(!Pieces[i].alive)
            continue;
            Pieces[i].rotate(deg);
            if(Pieces[i].team!=turn)
            Pieces[i].style.filter=`drop-shadow(0 0 10px ${inactiveShadow})`;
            else
            Pieces[i].style.filter=`drop-shadow(0 0 10px ${activeShadow})`;
        }
    }
}
else
{
    activeShadow="black";
    
    for(let i=0;i<Pieces.length;i++)
    {
        Pieces[i].style.filter=`drop-shadow(0px 0px 10px ${inactiveShadow})`;
    }
    switchTurn=function()
    {
        turn=!turn;
        if(turn)
        {
            labelW.style.color=labelActive;
            labelB.style.color=labelInactive;
            for(let i=0;i<Pieces.length;i++)
            Pieces[i].rotate(0);
        }
        else
        {
            labelB.style.color=labelActive;
            labelW.style.color=labelInactive;
            for(let i=0;i<Pieces.length;i++)
            Pieces[i].rotate(180);
        }
    }
} 
const BOARD=new Array(8);
for(let k=0;k<8;k++)
{
    BOARD[k]=new Array(8);
    BOARD[k].fill(null);
}


var table=document.querySelector("#container");
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
chessBoard.style.left=window.innerWidth/2-320+"px";
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


var colorSelector=document.createElement("input");
colorSelector.id="colorSelector";
colorSelector.type="color";
colorSelector.style.left=window.innerWidth/2+420+30+"px";
colorSelector.style.top=window.innerHeight-120+"px";
colorSelector.value=whiteSquares;
colorSelector.innerHTML="Color";
table.appendChild(colorSelector);


var labelW=document.createElement("label");
labelW.style.left=window.innerWidth/2+320+30+"px";
labelW.style.top="100px";
labelW.style.width="300px";
labelW.innerHTML="White";
labelW.style.color="black";

var labelB=document.createElement("label");
labelB.style.left=window.innerWidth/2-320-330+"px";
labelB.style.top="100px";
labelB.style.width="300px";
labelB.innerHTML="Black";



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