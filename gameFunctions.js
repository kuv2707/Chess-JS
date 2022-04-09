var kill=function(piece)
{
    piece.alive=false;
    let x=piece.location.x;
    let y=piece.location.y;
    animateDeathExplosion(boardOffsetX+x+40,boardOffsetY+y+40);
    blood.src=(piece.weight<=3?img1:img2).src;
    blood.remove();
    sqs[y/80][x/80].append(blood);
    piece.drag=null;
    piece.onmouseenter=null;
    piece.onmouseleave=null;
    piece.face.addEventListener("mousedown",piece.mouseD)
    piece.face.addEventListener("touchstart",piece.mouseD,{passive:false})
    piece.face.addEventListener("mouseenter",piece.mouseEnter)
    piece.face.addEventListener("mouseleave",piece.mouseLeave)
    piece.face.style="position:relative";
    piece.face.scale(0,0);
    piece.face.move(0,0);
    setTimeout(()=> piece.face.scale(1,1),1)
    if(piece.team==BLACK_TEAM)
    {
        
        blackGraveyard.append(piece.face)
    }
    else
    {
        whiteGraveyard.append(piece.face);
    }

}