let svgExplosion=document.querySelector("#Shockwave_canvas");
let circle=document.querySelector("#shock");

let prevAnim;
const animateDeathExplosion=function(x,y)
{
    clearInterval(prevAnim);
    prevAnim=0;
    let teamColor;
    // if(turn)
    // teamColor=Theme.bs;
    // else
    // teamColor=Theme.ws;
    teamColor="Red";
    svgExplosion.style.width=window.innerWidth+"px";
    svgExplosion.style.height=window.innerHeight+"px";
    circle.setAttribute("cx",x);
    circle.setAttribute("cy",y);
    circle.setAttribute("fill",teamColor);
    let k=0;
    prevAnim=setInterval(function()
    {
        circle.setAttribute("r",640*Math.sin(k));
        circle.setAttribute("fill-opacity",((Math.PI/2)-k*k)/(Math.PI));
        k+=0.02;
        if(k>Math.PI/2)
        {
            svgExplosion.style.width="0px";
            svgExplosion.style.height="0px";
            circle.setAttribute("r","0");
            clearInterval(prevAnim);
        }
        
    },8);
}


//random motion of gotis
let play=0;
let playstart=function()
{
    clearInterval(play);
    play=setInterval(function()
    {
        let temp=Pieces[Math.floor(Math.random()*Pieces.length)].style;
        temp.left=Math.floor(Math.random()*560/80)*80+boardOffsetX+"px";
        temp.top=Math.floor(Math.random()*560/80)*80+boardOffsetY+"px";
    },50);
}
let playend=function()
{
    clearInterval(play);
    for(let i=0;i<Pieces.length;i++)
    {
        Pieces[i].style.top=Pieces[i].homeY+boardOffsetY+"px";
        Pieces[i].style.left=Pieces[i].homeX+boardOffsetX+"px";
    }
    window.dispatchEvent(new Event('resize'));
}