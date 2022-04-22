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
        labelW.style.color="rgba(25, 255, 25, 1.0)";
        labelB.style.color="rgba(255, 255, 255, 1.0)";
    }
    else
    {
        deg=180;
        labelW.style.color="rgba(255, 255, 255, 1.0)";
        labelB.style.color="rgba(25, 255, 25, 1.0)";
    }
    if(gameRules.rotatePerspective.board)
    {
        chessBoard.rotate(deg);
    }
    if(gameRules.rotatePerspective.pieces)
    {   for(let i=0;i<Pieces.length;i++)
        {
            Pieces[i].face.rotate(deg);//does flip() seem better?
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
