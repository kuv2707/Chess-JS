let switchTurn=function()
{
    turn=(turn===BLACK_TEAM)?WHITE_TEAM:BLACK_TEAM;
    turnCount++;
    let deg;
    chessBoard.clear("move");
    if(turnCount>enPassantLoc.expiryMove)
    enPassantLoc.clear();
    if(turn==WHITE_TEAM)
    {
        deg=0;
        labelW.style.color="rgb(25, 180, 25)";
        labelB.style.color="rgb(255, 255, 255)";
    }
    else
    {
        deg=180;
        labelB.style.color="rgb(25, 180, 25)";
        labelW.style.color="rgb(255, 255, 255)";
    }
    if(gameRules.rotatePerspective.board)
    {
        chessBoard.rotate(deg);
    }
    if(gameRules.rotatePerspective.pieces)
    {   for(let i=0;i<Pieces.length;i++)
        {
            Pieces[i].face.rotate(deg);
        }
    }
}
const BOARD=new Array(8);
for(let k=0;k<8;k++)
{
    BOARD[k]=new Array(8);
    BOARD[k].fill(null);
}

function addTransformManager(go)
{
    go.scaleVal={x:1,y:1};
    go.rotateVal=0;
    go.translateCoords={x:0,y:0};
    go.rotated=false;
    go.updateAppearance=function()
    {
        this.style.transform=
        `translate(${this.translateCoords.x}px,${this.translateCoords.y}px)
        scale(${this.scaleVal.x},${this.scaleVal.y})
        rotate(${this.rotateVal}deg)
        
        `;
    }
    go.rotate=function(value)
    {
        if(this.rotateVal==value)
        return;
        this.rotateVal=value;
        this.updateAppearance();
        if(value%360==0)
        this.rotated=false;
        else
        this.rotated=true;
    }
    go.scale=function(valueX,valueY)
    {
        if(valueY==undefined)
        valueY=valueX;
        if(this.scaleVal.x==valueX&&this.scaleVal.y==valueY)
        return;
        this.scaleVal={x:valueX,y:valueY};
        this.updateAppearance();
    }
    go.move=function(xx,yy)
    {
        this.translateCoords.x=xx;
        this.translateCoords.y=yy;
        this.updateAppearance();
    }
    go.flip=function()
    {
        go.flipval*=-1;
        this.updateAppearance();
    }
}

function printBoard()
{
    console.clear();
    for(let i=0;i<8;i++)
    {
        let s="||"
        for(let j=0;j<8;j++)
        {
            s+=(BOARD[j][i]?BOARD[j][i].symbol:"  ")+"|";
        }
        console.log(8-i+s+"|");
    }
}
/**
 * @param {Number} x the x coordinate ranging from 0 to 7
 * @param {Number} y the y coordinate ranging from 0 to 7
 * @returns piece at given coordinates in the logical chess board of size 8x8
 */
function pieceAt(x,y)
{
    try
    {
        return BOARD[x][y];
    }
    catch(error)
    {
        return null;
    }
}
const dict=
{
    R:'wr',
    N:'wn',
    Q:'wq',
    K:'wk',
    B:'wb',
    P:'wp',
    r:'br',
    n:'bn',
    q:'bq',
    k:'bk',
    b:'bb',
    p:'bp'
}
function setFEN(fen)
{
    Pieces.forEach(function(e)
    {
        chessBoard.removeChild(e.face);
    });
    Pieces.length=0;
    for(let i=0;i<8;i++)
    {
        for(let j=0;j<8;j++)
        {
            BOARD[i][j]=null;
        }
    }
    turnCount=0;//necessary?
    let x=0,y=0,i;
    //place assignment
    for(i=0;i<fen.length;i++)
    {
        let c=fen.charAt(i);
        if(c==" ")
        break;
        if(!isNaN(c))
        {
            x+=Number(c)-1;
            
        }
        if(c=="/")
        {
            y++;
            x=0;
        }
        if(dict[c])
        {
            if(dict[c][0]=="b")
            {
                let p=new Piece(BLACK_TEAM,{x:x*80,y:y*80},dict[c]);
                try{

                    BOARD[x][y]=p;
                }
                catch(error)
                {
                    console.log(x,y)
                }
                Pieces.push(p);
                chessBoard.append(p.face);
                p.face.move(p.location.x,p.location.y);
            }
            if(dict[c][0]=="w")
            {
                let p=new Piece(WHITE_TEAM,{x:x*80,y:y*80},dict[c]);
                BOARD[x][y]=p;
                Pieces.push(p);
                chessBoard.append(p.face);
                p.face.move(p.location.x,p.location.y);
            }
            x++;
        }
        
    }
    i++;
    if(i>fen.length-1)return;
    //i now stores character containing current player's turn
    if((fen.charAt(i)=="b"  &&  turn)||(fen.charAt(i)=="w"  &&  !turn))
    switchTurn();
}

function getFEN(board=BOARD)
{
    
}




//my implementation of array.flat
/**
 * 
 * @param {Array} thisArr array on which this method is called
 * @param {Number} depth maximum depth of recursion 
 * @param {Array} retArr array containing flattened values upto specified depth
 * @returns 
 */
function Flat(thisArr,depth=0,retArr)
{
    if(!retArr)
    retArr=[];
    if(depth==0)
    return [...thisArr];
    for(let i=0;i<thisArr.length;i++)
    {
        if(thisArr[i]?.constructor.name=="Array")
        {
            
            let a=Flat(thisArr[i],depth-1,[]);
            a.forEach(function(Value)
            {
                retArr.push(Value);
            })

        }
        else
        retArr.push(thisArr[i]);
    }
    return retArr;
}
document.addEventListener("touchmove",function(e)
{
    e.preventDefault();
    e.stopPropagation();
},{passive:false});//touch events are by default passive!!!