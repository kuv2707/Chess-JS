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
            let ob={x:x+i,y:y+i,kill:false};
            array.push(ob);
            if(pieceAt(x+i,y+i))
            {
                if(pieceAt(x+i,y+i).team==piece.team)
                array.pop();
                else
                ob.kill=true;
                break;
            }            
        }
    }
    for(let i=-1;i>-8;i--)
    {
        if( x+i<8  &&  x+i>-1  &&  y+i<8  &&  y+i>=0)
        {
            let ob={x:x+i,y:y+i,kill:false};
            array.push(ob);
            if(pieceAt(x+i,y+i))
            {
                if(pieceAt(x+i,y+i).team==piece.team)
                array.pop();
                else
                ob.kill=true;
                break;
            }           
        }
    }
    for(let i=1;i<8;i++)
    {
        if( x+i<8  &&  x+i>=0  &&  y-i<8  &&  y-i>=0)
        {
            let ob={x:x+i,y:y-i,kill:false};
            array.push(ob);
            if(pieceAt(x+i,y-i))
            {
                if(pieceAt(x+i,y-i).team==piece.team)
                array.pop();
                else
                ob.kill=true;
                break;
            }         
        }  
    }
    for(let i=-1;i>-8;i--)
    {
        if( x+i<8  &&  x+i>=0  &&  y-i<8  &&  y-i>=0)
        {
            let ob={x:x+i,y:y-i,kill:false};
            array.push(ob);
            if(pieceAt(x+i,y-i))
            {
                if(pieceAt(x+i,y-i).team==piece.team)
                array.pop();
                else
                ob.kill=true;
                break;
            }         
        }
    }   
    return array;
}
const rookMoves=function()
{
    return getRectMoves(this,new Array());
}
const knightMoves=function()
{
    let now=this.location;
    let x=now.x/80;
    let y=now.y/80;
    let array=new Array();
    let piece=this;
    array.push({x:x+2,y:y+1,kill:false});
    array.push({x:x+2,y:y-1,kill:false});
    array.push({x:x-2,y:y-1,kill:false});
    array.push({x:x-2,y:y+1,kill:false});
    array.push({x:x-1,y:y+2,kill:false});
    array.push({x:x-1,y:y-2,kill:false});
    array.push({x:x+1,y:y-2,kill:false});
    array.push({x:x+1,y:y+2,kill:false});

    array=array.filter(function(value)
    {
        let ret=true;
        if(pieceAt(value.x,value.y))
        {
            if(pieceAt(value.x,value.y).team==piece.team)
            ret=false;
            else
            value.kill=true;
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
    array.push({x:x+1,y:y,kill:false});
    array.push({x:x+1,y:y-1,kill:false});
    array.push({x:x+1,y:y+1,kill:false});

    array.push({x:x-1,y:y-1,kill:false});
    array.push({x:x-1,y:y,kill:false});
    array.push({x:x-1,y:y+1,kill:false});
    
    array.push({x:x,y:y-1,kill:false});
    array.push({x:x,y:y+1,kill:false});

    array=array.filter(function(value)
    {
        let ret=true;
        if(pieceAt(value.x,value.y))
        {
            if(pieceAt(value.x,value.y).team==piece.team)
            ret=false;
            else
            value.kill=true;
        }
        return ret;
    })
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
    let x=now.x/80;
    let y=now.y/80;
    let array=new Array();
    if(this.team==WHITE_TEAM)
    {
        if(!pieceAt(x,y-1))
        {
            array.push({x:x,y:y-1,kill:false});
            if(y==6  &&  !pieceAt(x,y-2))
            array.push({x:x,y:y-2,kill:false});
        }
        if(pieceAt(x+1,y-1) &&  pieceAt(x+1,y-1).team!=this.team)
        {
            array.push({x:x+1,y:y-1,kill:true});
        }
        if(pieceAt(x-1,y-1) &&  pieceAt(x-1,y-1).team!=this.team)
        {
            array.push({x:x-1,y:y-1,kill:true});
        }
    }
    else
    {
        if(!pieceAt(x,y+1))
        {
            array.push({x:x,y:y+1,kill:false});
            if(y==1   &&  !pieceAt(x,y+2))
            array.push({x:x,y:y+2,kill:false});
        }
        
        if(pieceAt(x+1,y+1) &&  pieceAt(x+1,y+1).team!=this.team)
        {
            array.push({x:x+1,y:y+1,kill:true});
        }
        if(pieceAt(x-1,y+1) &&  pieceAt(x-1,y+1).team!=this.team)
        {
            array.push({x:x-1,y:y+1,kill:true});
        }
    }
    return array;
}