/**
 * 
 * @param {Piece} piece the piece which is killed
 * @param {Number} mrelX the x coordinate of point of lifting mouse button with respect to chessBoard object's location
 * @param {Numbwe} mrelY the y coordinate of point of lifting mouse button with respect to chessBoard object's location
 */
var kill=function(piece,mrelX,mrelY)
{
    piece.alive=false;
    let x=piece.location.x;
    let y=piece.location.y;
    BOARD[x/80][y/80]=null;
    animateDeathExplosion(mrelX,mrelY);
    blood.src=(piece.weight<=3?img1:img2).src;
    blood.style.opacity="1";
    piece.face.scale(0);
    blood.move(x,y);
    piece.drag=null;
    piece.onmouseenter=null;
    piece.onmouseleave=null;
    piece.face.removeEventListener("mousedown",piece.mouseD)
    piece.face.removeEventListener("touchstart",piece.mouseD,{passive:false})
    piece.face.removeEventListener("mouseenter",piece.mouseEnter)
    piece.face.removeEventListener("mouseleave",piece.mouseLeave)
    let subject;
    if(piece.team==BLACK_TEAM)
    subject=blackGraveyard;
    else
    subject=whiteGraveyard;
    
    for(let i=0;i<subject.childNodes.length;i++)
        {
            if(!subject.childNodes[i].occupied)
            {
                subject.childNodes[i].src=piece.face.src;
                piece.faceChg=function()
                {
                    subject.childNodes[i].src=piece.face.src;
                }
                subject.childNodes[i].occupied=true;
                subject.childNodes[i].style.opacity="1";
                break;
            }
        }

}