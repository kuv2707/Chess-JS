var kill=function(piece)
{
    piece.alive=false;
    let x=piece.location.x;
    let y=piece.location.y;
    animateDeathExplosion(boardOffsetX+x+40,boardOffsetY+y+40);
    blood.src=(piece.weight<=3?img1:img2).src;
    table.removeChild(piece.face);
    let t=sqs[y/80][x/80];
    blood.move(boardOffsetX+Math.floor(x/80)*80,boardOffsetY+Math.floor(y/80)*80)
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
    setTimeout(()=> piece.face.scale(1,1),1);
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