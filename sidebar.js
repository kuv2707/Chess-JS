let sidebar=document.createElement("div");
sidebar.id="sideBarDiv";
document.body.append(sidebar);
sidebar.expanded=false;




var sel=document.createElement("select");
sel.className="sidebarElements";
let pieceThemes=["Fantasy","Fantasy 2","Eyes","Skull","Katz","Freak","Classic","None"];
sel.value=pieceThemes[0];
for(let i=0;i<pieceThemes.length;i++)
{
    let o=document.createElement("option");
    o.innerText=pieceThemes[i];
    sel.append(o);
}
sel.addEventListener("change",function(e)
{
    Pieces.forEach(function(e)
    {
        e.face.src=`Images/${sel.value}/${e.face.id}.png`;
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