var cx=0;cy=0;

for(let i=0;i<Piece.face.length;i++)
{
    let p=new Piece(Piece.face[i].charAt(0)=='b'?false:true,{x:cx,y:cy},Piece.face[i])
    BOARD[cx/80][cy/80]=p;
    cx+=80;
    if(cx==640)
    {
        cx=0;
        cy+=80;
    }
    if(cy==160)
    {
        cy=480;
    }
    p.face.move(boardOffsetX+80+480*Math.random(),boardOffsetY+80+480*Math.random());
    Pieces.push(p);
    table.appendChild(p.face);
}
switchTurn();

window.addEventListener("load",resizeFunction);

//define player objects which control labels etc
