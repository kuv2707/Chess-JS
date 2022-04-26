var cx=0;cy=0;

setFEN("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR");
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
