var cx=0;cy=0;

setFEN("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR");
switchTurn();//begin game

window.addEventListener("load",function()
{
    resizeFunction();
    Pieces.forEach(function(p)
    {
        p.face.move(p.location.x,p.location.y);
    });
});




//define player objects which control labels etc
