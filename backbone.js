let switchTurn;
if(mode)
{
    
    switchTurn=function()
    {
        turn=!turn;
        let deg;
        if(turn)
        deg=0;
        else
        deg=180;
        
        labelW.style.color=labelActive;
        labelB.style.color=labelInactive;
        
        table.style.transform=`rotate(${deg}deg)`;
        labelB.style.transform=`rotate(${deg}deg)`;
        labelW.style.transform=`rotate(${deg}deg)`;
        for(let i=0;i<Pieces.length;i++)
        {
            
            if(!Pieces[i].alive)
            continue;
            Pieces[i].rotate(deg);
            if(Pieces[i].team!=turn)
            Pieces[i].style.filter=`drop-shadow(0 0 10px ${inactiveShadow})`;
            else
            Pieces[i].style.filter=`drop-shadow(0 0 10px ${activeShadow})`;
        }
    }
}
else
{
    activeShadow="black";
    
    for(let i=0;i<Pieces.length;i++)
    {
        Pieces[i].style.filter=`drop-shadow(0px 0px 10px ${inactiveShadow})`;
    }
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

