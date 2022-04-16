let switchTurn=function()
{
    turn=!turn;
    turnCount++;
    let deg;
    chessBoard.clear("move");
    if(turnCount>enPassantLoc.expiryMove)
    enPassantLoc.clear();
    if(turn)//white's turn
    {
        deg=0;
        labelW.style.backgroundColor="rgba(25, 255, 25, .45)";
        labelB.style.backgroundColor="rgba(255, 255, 255, .45)";
        
        
    }
    else
    {
        deg=180;
        labelW.style.backgroundColor="rgba(255, 255, 255, .45)";
        labelB.style.backgroundColor="rgba(25, 255, 25, .45)";
        
    }
    
    
    if(gameRules.rotatePerspective.board)
    {
        /*use chessboard instead of table for rotation*/
        table.rotate(deg);
        labelB.rotate(deg);
        labelW.rotate(deg);
        
    }
    if(gameRules.rotatePerspective.pieces)
    {   for(let i=0;i<Pieces.length;i++)
        {
            
            Pieces[i].face.rotate(deg);//does flip() seem better?
        }
    }
    //printBoard();
}
const BOARD=new Array(8);
for(let k=0;k<8;k++)
{
    BOARD[k]=new Array(8);
    BOARD[k].fill(null);
}

function addTransformManager(go)
{
    go.scaleVal=1;
    go.rotateVal=0;
    go.translateCoords={x:0,y:0};
    go.rotated=false;
    go.flipval=1;
    go.updateAppearance=function()
    {
        this.style.transform=
        `translate(${this.translateCoords.x}px,${this.translateCoords.y}px)
        scale(${this.scaleVal},${this.flipval*this.scaleVal})
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
    go.scale=function(value)
    {
        if(this.scaleVal==value)
        return;
        this.scaleVal=value;
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
function generateFEN()
{
    
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

function pieceAt(x,y)
{
    try
    {
        return BOARD[x][y];

    }
    catch(error)
    {
        //console.log(x,y,"out of bounds");
        return null;
    }
}


function setFEN(fen)
{
    for(let i=0;i<fen.length;i++)
    {
        let c=fen.charAt(i);
        
    }
}

function getFEN(board=BOARD)
{

}