var cx=0;cy=0;

//set from fenstring RAHTER THAN THIS  
for(let i=0;i<Piece.face.length;i++)
{
    let p=new Piece(Piece.face[i].charAt(0)=='b'?BLACK_TEAM:WHITE_TEAM,{x:cx,y:cy},Piece.face[i])
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
    p.face.move(560*Math.random(),560*Math.random());
    Pieces.push(p);
    chessBoard.append(p.face);
    
}
switchTurn();

window.addEventListener("load",resizeFunction);
window.addEventListener("load",function()
{
    Pieces.forEach(function(p)
    {
        p.face.move(p.location.x,p.location.y);
    });
});
//define player objects which control labels etc
