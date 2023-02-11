/**
 * FORMAT OF STORING MOVES:
 * x:x coordinate
 * y: y coordinate
 * sqCol: indicates whether there is a piece at (x,y) which will be killed
 */

let enPassantLoc={x:-2,y:-2,expiryMove:-1,pawn:null,clear:function()
{
    this.x=-2;
    this.y=-2;
    this.expiryMove=-1;
    this.pawn=null;
    chessBoard.clear("enp");
}};

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
        let ob={x:i,y:y,sqCol:"pink"};
        array.push(ob);
        if(pieceAt(i,y))
        {
            if(pieceAt(i,y).team==piece.team)
            array.pop();
            else
            ob.sqCol="red";
            break;
        }
    }
    for(let i=x+1;i<8;i++)
    {
        let ob={x:i,y:y,sqCol:"pink"};
        array.push(ob);
        if(pieceAt(i,y))
        {
            if(pieceAt(i,y).team==piece.team)
            array.pop();
            else
            ob.sqCol="red";
            break;
        }
    }
    //vertical scan
    for(let i=y-1;i>-1;i--)
    {
        let ob={x:x,y:i,sqCol:"pink"};
        array.push(ob);
        if(pieceAt(x,i))
        {
            if(pieceAt(x,i).team==piece.team)
            array.pop();
            else
            ob.sqCol="red";
            break;
        }
    }
    for(let i=y+1;i<8;i++)
    {
        let ob={x:x,y:i,sqCol:"pink"};
        array.push(ob);
        if(pieceAt(x,i))
        {
            if(pieceAt(x,i).team==piece.team)
            array.pop();
            else
            ob.sqCol="red";
            break;
        }
    }
    return array;
}
/**
 * 
 * @param {Piece} piece the piece whose allowed moves are to be retrieved
 * @param {Array} array the array to which the moves are to be appended
 */
function getSlantMoves(piece,array)
{
    let now=piece.location;
    let x=now.x/80;
    let y=now.y/80;
    for(let i=1;i<8;i++)
    {
        if( x+i<8  &&  x+i>=0  &&  y+i<8  &&  y+i>=0)
        {
            let ob={x:x+i,y:y+i,sqCol:"pink"};
            array.push(ob);
            if(pieceAt(x+i,y+i))
            {
                if(pieceAt(x+i,y+i).team==piece.team)
                array.pop();
                else
                ob.sqCol="red";
                break;
            }            
        }
    }
    for(let i=-1;i>-8;i--)
    {
        if( x+i<8  &&  x+i>-1  &&  y+i<8  &&  y+i>=0)
        {
            let ob={x:x+i,y:y+i,sqCol:"pink"};
            array.push(ob);
            if(pieceAt(x+i,y+i))
            {
                if(pieceAt(x+i,y+i).team==piece.team)
                array.pop();
                else
                ob.sqCol="red";
                break;
            }           
        }
    }
    for(let i=1;i<8;i++)
    {
        if( x+i<8  &&  x+i>=0  &&  y-i<8  &&  y-i>=0)
        {
            let ob={x:x+i,y:y-i,sqCol:"pink"};
            array.push(ob);
            if(pieceAt(x+i,y-i))
            {
                if(pieceAt(x+i,y-i).team==piece.team)
                array.pop();
                else
                ob.sqCol="red";
                break;
            }         
        }  
    }
    for(let i=-1;i>-8;i--)
    {
        if( x+i<8  &&  x+i>=0  &&  y-i<8  &&  y-i>=0)
        {
            let ob={x:x+i,y:y-i,sqCol:"pink"};
            array.push(ob);
            if(pieceAt(x+i,y-i))
            {
                if(pieceAt(x+i,y-i).team==piece.team)
                array.pop();
                else
                ob.sqCol="red";
                break;
            }         
        }
    }   
    return array;
}
const rookMoves=function()
{
    let k= getRectMoves(this,new Array());
    k.forEach((h)=>{h.spcl=()=>h.NOTcastlable=true});
    return k;
}
const knightMoves=function()
{
    let now=this.location;
    let x=now.x/80;
    let y=now.y/80;
    let array=new Array();
    let piece=this;
    array.push({x:x+2,y:y+1,sqCol:"pink"});
    array.push({x:x+2,y:y-1,sqCol:"pink"});
    array.push({x:x-2,y:y-1,sqCol:"pink"});
    array.push({x:x-2,y:y+1,sqCol:"pink"});
    array.push({x:x-1,y:y+2,sqCol:"pink"});
    array.push({x:x-1,y:y-2,sqCol:"pink"});
    array.push({x:x+1,y:y-2,sqCol:"pink"});
    array.push({x:x+1,y:y+2,sqCol:"pink"});

    array=array.filter(function(value)
    {
        let ret=true;
        if(pieceAt(value.x,value.y))
        {
            if(pieceAt(value.x,value.y).team==piece.team)
            ret=false;
            else
            value.sqCol="red";
        }
        return ret;
    })
    return array;
}
const kingMoves=function()
{
    let now=this.location;
    let x=now.x/80;
    let y=now.y/80;
    let array=new Array();
    let piece=this;
    array.push({x:x+1,y:y,sqCol:"pink"});
    array.push({x:x+1,y:y-1,sqCol:"pink"});
    array.push({x:x+1,y:y+1,sqCol:"pink"});

    array.push({x:x-1,y:y-1,sqCol:"pink"});
    array.push({x:x-1,y:y,sqCol:"pink"});
    array.push({x:x-1,y:y+1,sqCol:"pink"});
    
    array.push({x:x,y:y-1,sqCol:"pink"});
    array.push({x:x,y:y+1,sqCol:"pink"});

    array=array.filter(function(value)
    {
        let ret=true;
        if(pieceAt(value.x,value.y))
        {
            if(pieceAt(value.x,value.y).team==piece.team)
            ret=false;
            else
            value.sqCol="red";
        }
        value.spcl=()=>value.castlable=false;
        return ret;
    })


    //castling add
    if(piece.castlable==false)
    return array;
    //piece might be eligible for castling
    console.log("castl",piece.NOTcastlable)
    //right rook k saath
    {
        if(pieceAt(x+1,y)==null
        &&  pieceAt(x+2,y)==null
        &&  pieceAt(x+3,y)!=null
        &&  pieceAt(x+3,y).castlable
        &&  (""+pieceAt(x+3,y).symbolFEN).toUpperCase()=="R")
        {
            array.push({x:x+2,y:y,sqCol:"purple",spcl:function()
            {
                let rook=pieceAt(x+3,y);
                rook.setLocation((x+1)*80,y*80);
                rook.face.move(rook.location.x,rook.location.y);
                BOARD[x+3][y]=null;
                BOARD[x+1][y]=rook;
                piece.castlable=false;
                rook.castlable=false;
            }});
        }
    }
    //left rook k saath
    {
        if(pieceAt(x-1,y)==null
        &&  pieceAt(x-2,y)==null
        &&  pieceAt(x-3,y)==null
        &&  pieceAt(x-4,y)!=null
        &&  pieceAt(x-4,y).castlable
        &&  (""+pieceAt(x-4,y).symbolFEN).toUpperCase()=="R")
        {
            array.push({x:x-3,y:y,sqCol:"purple",spcl:function()
            {
                let rook=pieceAt(x-4,y);
                rook.setLocation((x-2)*80,y*80);
                rook.face.move(rook.location.x,rook.location.y);
                BOARD[x-4,y]=null;
                BOARD[x-2][y]=rook;
                piece.castlable=false;
                rook.castlable=false;
            }});
        }
    }

    return array;
}
const queenMoves=function()
{
    return getRectMoves(this,getSlantMoves(this,new Array()));
}
const bishopMoves=function()
{
    return getSlantMoves(this,new Array());
}
const pawnMoves=function()
{
    let now=this.location;
    let piece=this;
    let x=now.x/80;
    let y=now.y/80;
    let array=new Array();
    if(this.team==WHITE_TEAM)
    {
        if(!pieceAt(x,y-1))
        {
            array.push({x:x,y:y-1,sqCol:"pink"});
            if(y==6  &&  !pieceAt(x,y-2))
            array.push({x:x,y:y-2,sqCol:"pink",spcl:function()
            {
                enPassantLoc.x=x;
                enPassantLoc.y=y-1;
                enPassantLoc.expiryMove=turnCount+1;
                enPassantLoc.pawn=piece;
                chessBoard.clear("enp");
                chessBoard.highlight({...enPassantLoc,color:"orange",purpose:"enp"})
            }});
        }
        if(pieceAt(x+1,y-1) &&  pieceAt(x+1,y-1).team!=this.team)
        {
            array.push({x:x+1,y:y-1,sqCol:"red"});
        }
        if(pieceAt(x-1,y-1) &&  pieceAt(x-1,y-1).team!=this.team)
        {
            array.push({x:x-1,y:y-1,sqCol:"red"});
        }
    }
    else
    {
        if(!pieceAt(x,y+1))
        {
            array.push({x:x,y:y+1,sqCol:"pink"});
            if(y==1   &&  !pieceAt(x,y+2))//enp
            array.push({x:x,y:y+2,sqCol:"pink",spcl:function()
            {
                enPassantLoc.x=x;
                enPassantLoc.y=y+1;
                enPassantLoc.expiryMove=turnCount+1;
                enPassantLoc.pawn=piece;
                chessBoard.clear("enp");
                chessBoard.highlight({...enPassantLoc,color:"orange",purpose:"enp"})
            }});
        }
        
        if(pieceAt(x+1,y+1) &&  pieceAt(x+1,y+1).team!=this.team)
        {
            array.push({x:x+1,y:y+1,sqCol:"red"});
        }
        if(pieceAt(x-1,y+1) &&  pieceAt(x-1,y+1).team!=this.team)
        {
            array.push({x:x-1,y:y+1,sqCol:"red"});
        }
        
    }
    if(Math.abs(enPassantLoc.x-x)==1)
    {
        if(this.team==WHITE_TEAM)
        {
            if(enPassantLoc.y-y==-1)
            array.push({...enPassantLoc,sqCol:"red",spcl:function()
                {
                    //if this move is executed, it means en passant rule se kill hua h
                    kill(enPassantLoc.pawn,x*80,y*80);
                }});
        }
        if(this.team==BLACK_TEAM)
        {
            if(enPassantLoc.y-y==+1)
            array.push({...enPassantLoc,sqCol:"red",spcl:function()
                {
                    //if this move is executed, it means en passant rule se kill hua h
                    kill(enPassantLoc.pawn,x*80,y*80);
                }});
        }
    }
    return array;
}