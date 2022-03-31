let xb=-330;
let yb=220;
let xw=0;
let yw=220;


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


var resizeFunction=function()
{
    if(window.innerWidth/window.innerHeight>1.2)
    {
        labelW.move(window.innerWidth/2+320+30,boardOffsetY+80);
        labelB.move(window.innerWidth/2-320-330,boardOffsetY+80);
        whiteGraveyard.move(window.innerWidth/2+320+30,200);
        blackGraveyard.move(window.innerWidth/2-320-330,200);
        gameRules.rotatePerspective.board=true;
        if(!turn)
        table.rotate(180);
    }
    else
    {
        labelW.move(window.innerWidth/2+30,680);
        labelB.move(window.innerWidth/2-320,680);
        whiteGraveyard.move(window.innerWidth/2+30,750);
        blackGraveyard.move(window.innerWidth/2-320,750);
        gameRules.rotatePerspective.board=false;
        if(!turn)
        table.rotate(0);
    }
    chessBoard.move(window.innerWidth/2-320,0);
    boardOffsetX=window.innerWidth/2-320;
    

    for(let i=0;i<Pieces.length;i++)
    {
        let p=Pieces[i];
        if(p.alive)
        p.face.move(p.location.x+boardOffsetX,p.location.y+boardOffsetY);
    }
    //position blackGraveyard and whiteGraveyard accordingly
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
    if(gameRules.rotatePerspective.board  &&  gameRules.rotatePerspective.pieces)
    {
        if(!table.rotated)
        {
            return {"x":x,"y":y};
        }
        else
        {
            return{"x":window.innerWidth-x,
           "y":window.innerHeight-y}
        }
    }
    if(!gameRules.rotatePerspective.board  &&  gameRules.rotatePerspective.pieces)
    {
        return {"x":x,"y":y};
    }
}

labelB.addEventListener("touchstart",playstart,{passive:true});
labelB.addEventListener("click",playstart);
labelW.addEventListener("touchstart",playend,{passive:true});
labelW.addEventListener("click",playend);


