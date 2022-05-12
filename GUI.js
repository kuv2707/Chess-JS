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
        let sq=document.createElement("label");
        sq.className="boardSquares";
        sq.id="square"+i+"_"+j;
        if((i+j)%2==0)
        {
            sq.style.backgroundColor=blackSquares;
        }
        else
        {
            sq.style.backgroundColor=whiteSquares;
        }
        sq.purpose="";
        sq.addEventListener("contextmenu",function(e)
        {
            e.preventDefault();
            e.stopPropagation();
            console.log("context")
            contextMenu.showAt(e);
        })
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
width:80px;
height:80px;
border-radius:15px;
opacity:0;
transition-property:none;
`;
addTransformManager(blood);
chessBoard.append(blood);
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
        sqs[loc.y][loc.x].innerText=loc.purpose;
    }
    catch(outofbound){}
    
}
chessBoard.clear=function(purpose)
{
    sqs.forEach(function(k,i)
    {
        k.forEach(function(l,j)
        {
            if(purpose==l.innerText)
            {
                l.innerText="";
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
addTransformManager(chessBoard);
table.appendChild(chessBoard);


document.body.appendChild(table);

var labelW=document.createElement("label");
labelW.style.width="300px";
labelW.innerHTML="White";
labelW.className="playerLabel";

var labelB=document.createElement("label");
labelB.style.width="300px";
labelB.innerHTML="Black";
labelB.className="playerLabel";

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
    last:null,
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
        if(this.last)
        this.reset();
        this.last=sqs[y][x];
        this.last.style.borderRadius=`1px`
        
    },
    setListen:function(yes)
    {
        this.listen=yes;
        if(!yes)
        {
            if(this.last)
            this.reset();
            this.last=null;
        }
    },
    reset:function()
    {
        this.last.style.borderRadius="15px";
        
    }
}

document.addEventListener("click",function(e)
{
    if(sidebar.expanded  &&  e.clientY>250)
    {
        sidebar.hide();
        sidebar.expanded=false;
    }
    contextMenu.hide();
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

let contextMenu=document.createElement("div");
addTransformManager(contextMenu);
contextMenu.id="contextMenu";
chessBoard.appendChild(contextMenu);
contextMenu.scale(0,0);
contextMenu.showAt=function(e)
{
    let {x,y}=getXY(e)
    let bsq=e.target;
    bsq.style.backgroundColor="beige";
    bsq.innerText="beige";
    contextMenu.scale(1,1);
    contextMenu.move(x,y);
    
}
contextMenu.hide=function()
{
    contextMenu.scale(0,0);
}