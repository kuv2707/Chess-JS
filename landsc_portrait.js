var resizeFunction=function()
{
    if(window.innerWidth/window.innerHeight>1.2)
    {
        chessBoard.move(window.innerWidth/2-320,window.innerHeight/2-320);
        labelW.move(window.innerWidth/2+320+30,window.innerHeight/2-300);
        labelB.move(window.innerWidth/2-320-330,window.innerHeight/2-300);
        whiteGraveyard.move(window.innerWidth/2+320+30,window.innerHeight/2-300+80);
        blackGraveyard.move(window.innerWidth/2-320-330,window.innerHeight/2-300+80);
        gameRules.rotatePerspective.board=true;
        if(turn==BLACK_TEAM)
        chessBoard.rotate(180);
    }
    else
    {
        chessBoard.move(window.innerWidth/2-320,boardOffsetY);
        labelW.move(window.innerWidth/2+0,690);
        labelB.move(window.innerWidth/2-320,690);
        whiteGraveyard.move(window.innerWidth/2+0,760);
        blackGraveyard.move(window.innerWidth/2-320,760);
        gameRules.rotatePerspective.board=false;
        if(turn==BLACK_TEAM)
        chessBoard.rotate(0);
    }
};
window.addEventListener("resize",resizeFunction);

if(gameRules.highPerformance)
{
       var sync;
    colorSelector.addEventListener("focus", function (e) 
    {
        sync=setInterval(function()
            {
                setTheme(createTheme(HexToRGB(e.target.value)));
                
            },5);
        
    });
    colorSelector.addEventListener("blur", function () 
    {
        clearInterval(sync);
    });
 
}
else
{
    colorSelector.addEventListener("change", function (e) 
    {
        setTheme(createTheme(HexToRGB(e.target.value)));
    });
}


/**
 * 
 * @param {Event} e event object
 * @returns coordinates of mouseevent or touchevent with respect to chessBoard object
 * it doesnt care whether it is landscape or portrait mode, just that if the chessBoard object is rotated, then it will offset those changes
 */
function getXY(e)
{
    let x=0,y=0;
    x=e.pageX;
    y=e.pageY;
    if(!chessBoard.rotated)
    {
        return {"x":x-chessBoard.translateCoords.x,"y":y-chessBoard.translateCoords.y};
    }
    else
    {
        return{"x":640-(x-chessBoard.translateCoords.x),
    "y":640-(y-chessBoard.translateCoords.y)}
    }
}

// labelB.addEventListener("touchstart",playstart,{passive:true});
// labelB.addEventListener("click",playstart);
// labelW.addEventListener("touchstart",playend,{passive:true});
// labelW.addEventListener("click",playend);


