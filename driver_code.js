
var addDraggability=function(div)
{
    var x,y;
    //only for pointer-based devices
    div.onmouseenter=function()
    {
        if(turn!=div.team)
        return;
        div.scale(9/8);
        //div.style.filter=`drop-shadow(0 0 20px ${activeShadow})`;
    };
    div.onmouseleave=function()
    {
        div.scale(1);
        //div.style.filter=`drop-shadow(0 0 10px ${turn==div.team&&mode==true?activeShadow:inactiveShadow})`;
    };
    div.drag=function(e)
    {
        e.stopPropagation();
        e.preventDefault();
        div.style.transitionProperty="none";
        var xy=getXY(e,true);
        div.move(xy.x-x,xy.y-y);
        //div.style.filter=`drop-shadow(0 0 15px ${activeShadow})`;
        
        //let a=Math.floor(tentativeMove.x);
        //let b=Math.floor(tentativeMove.y);
        tentativeMove.setXY(Math.floor((xy.x-boardOffsetX)/80),
        Math.floor((xy.y-boardOffsetY)/80));
    }
    let md=function(e)
    {
        if(!div.alive)
        return;
        if(turn!=div.team)
        return;
        var xy=getXY(e,false);
        div.style.zIndex="4";
        x=Number(xy.x-div.getBoundingClientRect().left);
        y=Number(xy.y-div.getBoundingClientRect().top);
        if(gameRules.rotatePerspective.board  &&  !turn)
        {
            x=80-x;
            y=80-y;
        }
        
        if(div.alive)
        {
            document.addEventListener("mousemove",div.drag)
            document.addEventListener("touchmove",div.drag)
        }
        div.scale(100/80);
        document.addEventListener("mouseup",docmu)
        document.addEventListener("touchend",docmu)
        tentativeMove.setListen(true);
    };
    div.addEventListener("mousedown",md)
    div.addEventListener("touchstart",md,{passive:true})
    let mu=function(e)
    {
        if(!div.alive)
        return;
        var xy=getXY(e,true);
        setTimeout(()=>div.style.zIndex="3",850);
        
        div.scale(1);
        div.style.transitionProperty="transform";
        document.removeEventListener("mousemove",div.drag)
        document.removeEventListener("touchmove",div.drag)
        let vx=Math.floor((xy.x-boardOffsetX)/80)*80;
        let vy=Math.floor((xy.y-boardOffsetY)/80)*80;
        
        if(!(vx>=640 ||  vy>=640  ||  vx<0  ||  vy<0))
        {
            /**
             * a successful turn is when:
             * already is null
             * or it is of different team
             */
            var already=BOARD[vx/80][vy/80];//indexoutofbounds exception never occurs
            if(already==null)
            {
                switchTurn();
                
                BOARD[Math.floor(div.homeX/80)][Math.floor(div.homeY/80)]=null;
                div.homeX=vx;
                div.homeY=vy;
                BOARD[Math.floor(div.homeX/80)][Math.floor(div.homeY/80)]=div;
            }
            else
            {
                if(!(already.team==div.team))
                {
                    //kill what is already there
                    let hx=already.homeX;
                    let hy=already.homeY;
                    allotDeadLocation(already);
                    already.alive=false;
                    animateDeathExplosion(xy.x,xy.y);
                    blood.src=(Math.random()<0.5?img1:img2).src;
                    
                    blood.remove();
                    sqs[vy/80][vx/80].append(blood);

                    already.onmouseenter=null;
                    already.onmouseleave=null;
                    switchTurn();
                    //already.style.filter=`drop-shadow(0px 0px 10px black)`;
                    
                    //repitition
                    BOARD[Math.floor(div.homeX/80)][Math.floor(div.homeY/80)]=null;
                    div.homeX=vx;
                    div.homeY=vy;
                    BOARD[Math.floor(div.homeX/80)][Math.floor(div.homeY/80)]=div;
                }
                
            }
        }
        div.move(div.homeX+boardOffsetX,div.homeY+boardOffsetY);
    };
    let docmu=function(e)
    {
        document.removeEventListener("mousemove",div.drag)
        document.removeEventListener("touchmove",div.drag)
        document.removeEventListener("mouseup",docmu)
        document.removeEventListener("touchend",docmu)
        mu(e);
        tentativeMove.setListen(false);
    };
    
}
var cx=0;cy=0;
var face=["br","bn","bb","bq","bk","bb","bn","br","bp","bp","bp","bp","bp","bp","bp","bp",
            "wp","wp","wp","wp","wp","wp","wp","wp","wr","wn","wb","wk","wq","wb","wn","wr"];
for(let i=0;i<face.length;i++)
{
    var go=document.createElement("img");
    go.id=face[i];
    go.team=go.id.charAt(0)=='b'?false:true;//false means black
    go.className="draggable";
    go.src="MediaResources/Fantasy/"+face[i]+".png";
    go.alt=face[i];
    table.appendChild(go);
    go.homeX=cx;
    go.homeY=cy;
    go.alive=true;
    addTransformManager(go);
    BOARD[go.homeX/80][go.homeY/80]=go;
    cx+=80;
    if(cx==640)
    {
        cx=0;
        cy+=80;
    }
    if(cy==160  )
    {
        cy=480;

    }
    go.move(go.homeX+boardOffsetX,go.homeY+boardOffsetY);
    go.style.zIndex="3";
    if(mode)
    {
        //go.style.transitionProperty="width,height,left,top,filter";
        //go.defaulttp="width,height,left,top,filter,transform";
    }
    else
    {
        //go.style.transitionProperty="width,height,left,top,filter";
        //go.defaulttp="width,height,left,top,filter";
    }
    
    
    addDraggability(go);
    Pieces.push(go);

}
switchTurn();
window.dispatchEvent(new Event('resize'));
