let circle=document.querySelector("#shock");
let svgExplosion=document.querySelector("#Shockwave_canvas");
addTransformManager(svgExplosion);
circle.setAttribute("cx","200");
circle.setAttribute("cy","200");
circle.setAttribute("r",200*Math.sin(0));
const animateDeathExplosion=function(x,y)
{
    svgExplosion.style.zIndex="1";
    let teamColor="Red";
    circle.setAttribute("cx",""+x);
    circle.setAttribute("cy",""+y);
    circle.setAttribute("fill",teamColor);
    circle.setAttribute("fill-opacity",0.5);
    let k=0;
    circle.setAttribute("r",200*Math.sin(k));
    let animator=function()
    {
        
        let rad=200*Math.sin(k);
        circle.setAttribute("r",""+rad);
        circle.setAttribute("fill-opacity",((Math.PI/2)-k)/(Math.PI));
        k+=0.05;
        if(k>Math.PI/2  )
        {
            circle.setAttribute("r","0");
            svgExplosion.style.zIndex="-1";
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
        temp.face.move(Math.floor(Math.random()*560/80)*80,Math.floor(Math.random()*560/80)*80);
        
    },50);
}
let playend=function()
{
    clearInterval(play);
    for(let i=0;i<Pieces.length;i++)
    {
        if(Pieces[i].alive)
        Pieces[i].face.move(Pieces[i].location.x,Pieces[i].location.y);
    }
    resizeFunction();
}


