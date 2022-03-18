let svgExplosion=document.querySelector("#Shockwave_canvas");
svgExplosion.style.zIndex="1";
svgExplosion.setAttribute("width",window.innerWidth);
if(mode)
svgExplosion.style.width="100%";
let circle=document.querySelector("#shock");

let prevAnim;
const animateDeathExplosion=function(x,y)
{
    clearInterval(prevAnim);
    prevAnim=0;
    let teamColor;
    teamColor="Red";
    circle.setAttribute("cx",x);
    circle.setAttribute("cy",y);
    circle.setAttribute("fill",teamColor);
    let k=0;
    let animator=function()
    {
        circle.setAttribute("r",200*Math.sin(k));
        circle.setAttribute("fill-opacity",((Math.PI/2)-k*k)/(Math.PI));
        k+=0.05;
        if(k>Math.PI/2)
        {
            circle.setAttribute("r","0");
        }
        else
        window.requestAnimationFrame(animator);
    };
    window.requestAnimationFrame(animator);
}


//random motion of gotis
let play=0;
let playstart=function()
{
    clearInterval(play);
    play=setInterval(function()
    {
        let temp=Pieces[Math.floor(Math.random()*Pieces.length)];
        if(temp.alive)
        temp.move(Math.floor(Math.random()*560/80)*80+boardOffsetX,Math.floor(Math.random()*560/80)*80+boardOffsetY);
        
    },50);
}
let playend=function()
{
    clearInterval(play);
    for(let i=0;i<Pieces.length;i++)
    {
        if(Pieces[i].alive)
        Pieces[i].move(Pieces[i].homeX+boardOffsetX,Pieces[i].homeY+boardOffsetY);
    }
    window.dispatchEvent(new Event('resize'));
}




function printBoard()
{
    for(let i=0;i<BOARD.length;i++)
    {
        let s="";
        for(let j=0;j<BOARD.length;j++)
        {
            if(BOARD[j][i]!=null)
            s+=BOARD[j][i].id+" |";
            else
            s+="   |";
        }
        console.log(s);
    }
}