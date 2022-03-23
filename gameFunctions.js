var kill=function(piece)
{
    piece.alive=false;
    let x=piece.homeX;
    let y=piece.homeY;
    animateDeathExplosion(boardOffsetX+x+40,boardOffsetY+y+40);
    blood.src=(Math.random()<0.5?img1:img2).src;
    blood.remove();
    sqs[y/80][x/80].append(blood);
    piece.drag=null;
    piece.onmouseenter=null;
    piece.onmouseleave=null;
    piece.style="position:relative";
    piece.scale(0,0);
    piece.move(0,0);
    setTimeout(()=> piece.scale(1,1),1)
    if(piece.team==false)
    {
        
        blackGraveyard.append(piece)
    }
    else
    {
        whiteGraveyard.append(piece);
    }

}