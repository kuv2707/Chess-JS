let switchTurn;
if(mode)
{
    
    switchTurn=function()
    {
        turn=!turn;
        let deg;
        if(turn)
        {
            deg=0;
            labelW.style.color=labelActive;
            labelB.style.color=labelInactive;
            table.rotated=false;
        }
        else
        {
            deg=180;
            labelB.style.color=labelActive;
            labelW.style.color=labelInactive;
            table.rotated=true;
        }
        
        
        if(gameRules.rotatePerspective.board)
        {
            table.style.transform=`rotate(${deg}deg)`;
            labelB.rotate(deg);
            labelW.rotate(deg);
            
        }
        if(gameRules.rotatePerspective.pieces)
        {   for(let i=0;i<Pieces.length;i++)
            {
                
                if(!Pieces[i].alive)
                continue;
                Pieces[i].rotate(deg);
            }
        }
    }
}
else
{
    activeShadow="black";
    
    switchTurn=function()
    {
        turn=!turn;
        if(turn)
        {
            labelW.style.color=labelActive;
            labelB.style.color=labelInactive;
            for(let i=0;i<Pieces.length;i++)
            Pieces[i].rotate(0);
        }
        else
        {
            labelB.style.color=labelActive;
            labelW.style.color=labelInactive;
            for(let i=0;i<Pieces.length;i++)
            Pieces[i].rotate(180);
        }
    }
} 
const BOARD=new Array(8);
for(let k=0;k<8;k++)
{
    BOARD[k]=new Array(8);
    BOARD[k].fill(null);
}

function addTransformManager(go)
{
    go.scaleVal=1;
    go.rotateVal=0;
    go.translateCoords={x:0,y:0};
    go.updateAppearance=function()
    {
        this.style.transform=
        `translate(${this.translateCoords.x}px,${this.translateCoords.y}px)
        scale(${this.scaleVal})
        rotate(${this.rotateVal}deg)
        
        
        `;
    }
    go.rotate=function(value)
    {
        if(this.rotateVal==value)
        return;
        this.rotateVal=value;
        this.updateAppearance();
    }
    go.scale=function(value)
    {
        if(this.scaleVal==value)
        return;
        this.scaleVal=value;
        this.updateAppearance();
    }
    go.move=function(xx,yy=this.translateCoords.y)
    {
        this.translateCoords.x=xx;
        this.translateCoords.y=yy;
        this.updateAppearance();
    }
}