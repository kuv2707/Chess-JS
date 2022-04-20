var cx=0;cy=0;

for(let i=0;i<Piece.face.length;i++)
{
    let p=new Piece(Piece.face[i].charAt(0)=='b'?BLACK_TEAM:WHITE_TEAM,{x:cx,y:cy},Piece.face[i])
    BOARD[cx/80][cy/80]=p;
    cx+=80;
    //set from fenstring
    if(cx==640)
    {
        cx=0;
        cy+=80;
    }
    if(cy==160)
    {
        cy=480;
    }
    //p.face.move(560*Math.random(),560*Math.random());
    Pieces.push(p);
    chessBoard.append(p.face);
    p.face.move(p.location.x,p.location.y);
}
switchTurn();

window.addEventListener("load",resizeFunction);

//define player objects which control labels etc
