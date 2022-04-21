let xb=-330;
let yb=220;
let xw=0;
let yw=220;

/**
labelB.style.textShadow=`            
        0 0 7px #fff,
        0 0 10px #fff, 
        0 0 21px #fff, 
        0 0 42px #0af, 
        0 0 82px #0af 
        `;
    labelW.style.textShadow=`            
        0 0 7px #fff,
        0 0 10px #fff, 
        0 0 21px #fff, 
        0 0 42px #0fa, 
        0 0 82px #0fa
        `;

*/
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
        if(!turn)
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
        if(!turn)
        chessBoard.rotate(0);
    }
};
let res=-1;
window.addEventListener("resize",function()
{
    clearTimeout(res);
    res=setTimeout(resizeFunction,0.5);
});


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
 * @returns coordinates of mouseevent or touchevent with respect to current perspective
 */
function getXY(e)
{
    let x=0,y=0;
    if(!mode)
    if(e.type.includes("touch"))
    {
        let evt=(typeof e.originalEvent==='undefined')?e:e.originalEvent;
        let touch=evt.touches[0]||evt.changedTouches[0];
        x=touch.pageX;
        y=touch.pageY;
        
    }
    if(e.type.includes("mouse"))
    {
        x=e.pageX;
        y=e.pageY;
    }
    /**
     * table and pieces both rotatable: landscape mode
     * pieces only rotatable: portrait mode
     */
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

labelB.addEventListener("touchstart",playstart,{passive:true});
labelB.addEventListener("click",playstart);
labelW.addEventListener("touchstart",playend,{passive:true});
labelW.addEventListener("click",playend);


