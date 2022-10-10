let sidebar=document.createElement("div");
sidebar.id="sideBarDiv";
document.body.append(sidebar);
sidebar.expanded=false;




var sel=document.createElement("select");
sel.className="sidebarElements";
let pieceThemes=["Alfonso","Alpha","California","Cardinal","Cats","Cburnett","Celtic","Chess7","Chessicons","Chessmonk","Chessnut","Companion","Dubrovny","Eyes","Fantasy","Fantasy 2","Freak","Freestaunton","Fresca","Gioco","Governor","Horsey","Icpieces","Kilfiger","Kosal","Leipzig","Letter","Libra","Maestro","Magnetic","Makruk","Maya","Merida","Merida_new","Metaltops","Pirat","Pirouetti","Pixel","Regular","Reillycraig","Riohacha","Shapes","Sittuyin","Skulls","Spacial","Staunty","Tatiana"];


for(let i=0;i<pieceThemes.length;i++)
{
    let o=document.createElement("option");
    o.innerText=pieceThemes[i];
    sel.append(o);
}
//sel.value=pieceThemes[Math.floor(sel.childNodes.length*Math.random())];
sel.value=pieceThemes[5]
sel.addEventListener("change",function(e)
{
    Pieces.forEach(function(e)
    {
        e.face.src=`Images/${sel.value}/${e.face.id}.svg`;
        if(e.faceChg)
        e.faceChg();
    })
})
sidebar.append(sel);


var colorSelector=document.createElement("input");
colorSelector.id="colorSelector";
colorSelector.type="color";
colorSelector.value=whiteSquares;
colorSelector.innerHTML="Color";
sidebar.appendChild(colorSelector);