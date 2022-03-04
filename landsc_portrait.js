let xb=-330;
let yb=220;
let xw=0;
let yw=220;
var allotDeadLocation;
if(window.innerWidth/window.innerHeight>1)
{
    //landscape view
    labelB.style.textShadow=`            
        0 0 7px #fff,
        0 0 10px #fff, 
        0 0 21px #fff, 
        0 0 42px #0af, 
        0 0 82px #0af, 
        0 0 92px #0af, 
        0 0 102px #0af,
        0 0 151px #0af`;
    labelW.style.textShadow=`            
        0 0 7px #fff,
        0 0 10px #fff, 
        0 0 21px #fff, 
        0 0 42px #0fa, 
        0 0 82px #0fa, 
        0 0 92px #0fa, 
        0 0 102px #0fa,
        0 0 151px #0fa`;
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
        chessBoard.style.left=window.innerWidth/2-320+"px";
        boardOffsetX=window.innerWidth/2-320;
        
        labelW.style.left=window.innerWidth/2+320+30+"px";
        labelB.style.left=window.innerWidth/2-320-330+"px";
        
        Pieces.forEach(function(dog)
        {
            if(dog.alive)
            dog.style.left=dog.homeX+boardOffsetX+"px";
            else
            {
                if(dog.team==false)
                dog.style.left=window.innerWidth/2-320+dog.homeX+"px";
                else
                dog.style.left=window.innerWidth/2+320+dog.homeX+"px";
            }
        });
    });

    sqs.forEach(function(k,i)
    {
        k.forEach(function(l,j)
        {
            
            l.style.borderRadius="15px";
        })
    })
    
    allotDeadLocation=function(piece)
    {
        if(piece.team==false)
        {
            
            piece.style.left=window.innerWidth/2-320+xb+"px";
            piece.style.top=yb+boardOffsetY+"px";
            piece.style.height="75px";
            piece.style.width="75px";
            piece.homeX=xb;
            piece.homeY=yb;
            xb+=75;
            if(xb==-30)
            {
                xb=-330;
                yb+=75;
            }
            
        }
        else
        {
            piece.style.left=window.innerWidth/2+330+xw+"px";
            piece.style.top=yw+boardOffsetY+"px";
            piece.style.height="75px";
            piece.style.width="75px";
            piece.homeX=xw+10;
            piece.homeY=yw;
            xw+=75;
            if(xw==300)
            {
                xw=0;
                yw+=75;
            }
        }
        
        
    };

}
else
{
    //portrait view
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
    colorSelector.addEventListener("change", function (e) 
    {
        setTheme(createTheme(HexToRGB(e.target.value)));
        
    });
    chessBoard.style.left="0px";
    Pieces.forEach(function(dog)
    {
        if(dog.alive)
        dog.style.left=dog.homeX+boardOffsetX+"px";
        else
        {
            if(dog.team==false)
            dog.style.left=window.innerWidth/2-320+dog.homeX+"px";
            else
            dog.style.left=window.innerWidth/2+320+dog.homeX+"px";
        }
    });
    boardOffsetX=0;
    
    labelW.style.left="330px";
    labelB.style.left="10px";
    labelW.style.top="680px";
    labelB.style.top="680px";

    xb=0;
    xw=320;
    yb=840;
    yw=840;

    
    
    allotDeadLocation=function(piece)
    {
        if(piece.team==false)
        {
            
            piece.style.left=xb+"px";
            piece.style.top=yb+boardOffsetY+"px";
            piece.style.height="75px";
            piece.style.width="75px";
            piece.homeX=xb;
            piece.homeY=yb;
            xb+=60;
            if(xb==240)
            {
                xb=0;
                yb+=60;
            }
            
        }
        else
        {
            piece.style.left=xw+"px";
            piece.style.top=yw+boardOffsetY+"px";
            piece.style.height="75px";
            piece.style.width="75px";
            piece.homeX=xw;
            piece.homeY=yw;
            xw+=60;
            
            if(xw==320+240)
            {
                xw=320;
                yw+=60;
            }
        }
        
        
    }
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
    if(transforms)
    {
        if(turn)
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
