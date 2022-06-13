let shockwave=document.createElement("canvas");
shockwave.className="Shockwave_canvas";
shockwave.width=640;
shockwave.height=640;
shockwave.style.zIndex="2";
addTransformManager(shockwave);
//shockwave.move(0,-640);//not needed as earlier shockwave had an id instead of classname which led to that issue
chessBoard.append(shockwave);
let g=shockwave.getContext("2d");
const animateDeathExplosion=function(x,y)
{
    shockwave.style.zIndex="1";
    g.beginPath();
    let k=0;
    let animator=function()
    {
        g.clearRect(0,0,shockwave.width,shockwave.height);
        g.beginPath();
        let rad=200*Math.sin(k);
        g.arc(x,y,rad,0,360);
        g.fillStyle=`rgba(230,30,40,${((Math.PI/2)-k)/(Math.PI)})`;
        g.fill();
        k+=0.05;
        if(k>Math.PI/2  )
        {
            shockwave.style.zIndex="-1";
            g.clearRect(0,0,shockwave.width,shockwave.height);
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


