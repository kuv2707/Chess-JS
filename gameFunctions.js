var kill=function(piece,mrelX,mrelY)
{
    piece.alive=false;
    let x=piece.location.x;
    let y=piece.location.y;
    animateDeathExplosion(mrelX,mrelY);
    blood.src=(piece.weight<=3?img1:img2).src;
    blood.style.opacity="1"
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
                subject.childNodes[i].occupied=true;
                subject.childNodes[i].style.opacity="1";
                break;
            }
        }

}