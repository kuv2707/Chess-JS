/**
 * FORMAT OF STORING MOVES:
 * x:x coordinate
 * y: y coordinate
 * kill: indicates whether there is a piece at (x,y) which will be killed
 */
/**
 * to be used by rook,queen
 * @param {Piece} piece the piece whose allowed moves are to be retrieved
 * @param {Array} array the array to which the moves are to be appended
 */
function getRectMoves(piece,array)
{
    let now=piece.location;
    let x=now.x/80;
    let y=now.y/80;
    //horizontal scan
    for(let i=x-1;i>=0;i--)
    {
        let ob={x:i,y:y,kill:false};
        array.push(ob);
        if(pieceAt(i,y))
        {
            if(pieceAt(i,y).team==piece.team)
            array.pop();
            else
            ob.kill=true;
            break;
        }
    }
    for(let i=x+1;i<8;i++)
    {
        let ob={x:i,y:y,kill:false};
        array.push(ob);
        if(pieceAt(i,y))
        {
            if(pieceAt(i,y).team==piece.team)
            array.pop();
            else
            ob.kill=true;
            break;
        }
    }
    //vertical scan
    for(let i=y-1;i>-1;i--)
    {
        let ob={x:x,y:i,kill:false};
        array.push(ob);
        if(pieceAt(x,i))
        {
            if(pieceAt(x,i).team==piece.team)
            array.pop();
            else
            ob.kill=true;
            break;
        }
    }
    for(let i=y+1;i<8;i++)
    {
        let ob={x:x,y:i,kill:false};
        array.push(ob);
        if(pieceAt(x,i))
        {
            if(pieceAt(x,i).team==piece.team)
            array.pop();
            else
            ob.kill=true;
            break;
        }
    }
    return array;
}
function getSlantMoves(piece,array)
{
    
}
const rookMoves=function(piece)
{
    return getRectMoves(piece,new Array());
}
const knightMoves=function(piece)
{

}
const kingMoves=function(piece)
{
    
}
const queenMoves=function(piece)
{
    
}
const bishopMoves=function(piece)
{
    
}
const pawnMoves=function(piece)
{
    let array=new Array();
    if(piece.team==true)
    {
        array.push({x:Math.floor(this.location.x/80),y:Math.floor(this.location.y/80)-1,kill:false});
    }
    else
    {
        array.push({x:Math.floor(this.location.x/80),y:Math.floor(this.location.y/80)+1,kill:false});
    }
    return array;
}