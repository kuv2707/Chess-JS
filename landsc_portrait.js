let xb=-330;
let yb=220;
let xw=0;
let yw=220;
var allotDeadLocation=function(piece)
{
    piece.style="position:relative"
    piece.updateAppearence=null;
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
    console.log(piece);

}

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
if(window.innerWidth/window.innerHeight>1)
{
    //landscape view
    
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
    
    window.addEventListener("resize",function()
    {
        chessBoard.move(window.innerWidth/2-320,0);
        boardOffsetX=window.innerWidth/2-320;
        labelW.move(window.innerWidth/2+320+30,boardOffsetY+80);
        labelB.move(window.innerWidth/2-320-330,boardOffsetY+80);
        whiteGraveyard.move(window.innerWidth/2+320+30,200);
        blackGraveyard.move(window.innerWidth/2-320-330,200);
        Pieces.forEach(function(dog)
        {
            if(dog.alive)
            dog.move(dog.homeX+boardOffsetX);
        });

        //position blackGraveyard and whiteGraveyard accordingly
    });

    sqs.forEach(function(k,i)
    {
        k.forEach(function(l,j)
        {
            
            l.style.borderRadius="15px";
        })
    })
    
    

}
else
{
    //portrait view
    
    colorSelector.addEventListener("change", function (e) 
    {
        setTheme(createTheme(HexToRGB(e.target.value)));
        
    });
    Pieces.forEach(function(dog)
    {
        if(dog.alive)
        dog.style.left=dog.homeX+boardOffsetX+"px";
    });
    boardOffsetX=0;
    
    labelW.style.left="330px";
    labelB.style.left="10px";
    labelW.style.top="680px";
    labelB.style.top="680px";

    whiteGraveyard.style.left="330px";
    blackGraveyard.style.left="10px";
    whiteGraveyard.style.top="780px";
    blackGraveyard.style.top="780px";

    xb=0;
    xw=320;
    yb=840;
    yw=840;

    
    
    
}

function getXY(e,transforms)
{
    let x=0,y=0;
    if(!mode)
    transforms=false;
    if(e.type.substring(0,5)=="touch")
    {
        let evt=(typeof e.originalEvent==='undefined')?e:e.originalEvent;
        let touch=evt.touches[0]||evt.changedTouches[0];
        x=touch.pageX;
        y=touch.pageY;
        
    }
    if(e.type.substring(0,5)=="mouse")
    {
        x=e.clientX;
        y=e.clientY;
    }
    if(transforms  &&  gameRules.rotatePerspective)
    {
        if(!table.rotated)
        {
            return {"x":x,"y":y};
        }
        else
        {
            return rotate({"x":x,"y":y});
        }
    }
    else
    {
        return {"x":x,"y":y};
    }
}
function rotate({x,y})
{
    return{"x":window.innerWidth-x,
        "y":window.innerHeight-y}
}

labelB.addEventListener("touchstart",playstart,{passive:true});
labelB.addEventListener("click",playstart);
labelW.addEventListener("touchstart",playend,{passive:true});
labelW.addEventListener("click",playend);


