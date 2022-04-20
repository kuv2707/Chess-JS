let svgExplosion=document.createElement("svg");
svgExplosion.id="#Shockwave_canvas";
addTransformManager(svgExplosion);
svgExplosion.style.zIndex="1";
let circle=document.querySelector("#shock");
circle.setAttribute("cx","200");
circle.setAttribute("cy","200");
circle.setAttribute("r",200*Math.sin(0));
let prevAnim;
const animateDeathExplosion=function(x,y)
{
    clearInterval(prevAnim);
    prevAnim=0;
    let teamColor="Red";
    svgExplosion.move(x-200,y-200);
    circle.setAttribute("fill",teamColor);
    let k=0;
    circle.setAttribute("r",200*Math.sin(k));
    let animator=function()
    {
        
        
        circle.setAttribute("r",""+200*Math.sin(k));
        circle.setAttribute("fill-opacity",((Math.PI/2)-k)/(Math.PI));
        k+=0.05;
        if(k>Math.PI/2)
        {
            circle.setAttribute("r","0");
            svgExplosion.move(-400,-400);
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


