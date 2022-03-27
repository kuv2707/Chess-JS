var kill=function(piece)
{
    piece.alive=false;
    let x=piece.location.x;
    let y=piece.location.y;
    animateDeathExplosion(boardOffsetX+x+40,boardOffsetY+y+40);
    blood.src=(Math.random()<0.5?img1:img2).src;
    blood.remove();
    sqs[y/80][x/80].append(blood);
    piece.drag=null;
    piece.onmouseenter=null;
    piece.onmouseleave=null;
    piece.face.style="position:relative";
    piece.face.scale(0,0);
    piece.face.move(0,0);
    setTimeout(()=> piece.face.scale(1,1),1)
    if(piece.team==false)
    {
        
        blackGraveyard.append(piece.face)
    }
    else
    {
        whiteGraveyard.append(piece.face);
    }

}