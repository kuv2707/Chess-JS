let sidebar=document.createElement("div");
sidebar.id="sideBarDiv";
document.body.append(sidebar);
sidebar.expanded=false;
sidebar.show=function()
{
    sidebar.style.height="250px";
    sidebar.expanded=true;
    showHide.scale(0);
}
sidebar.hide=function()
{
    sidebar.style.height="0px";
    sidebar.expanded=false;
    showHide.scale(1);
}
sidebar.toggle=function()
{
    if(sidebar.expanded)
    sidebar.hide();
    else
    sidebar.show();
}
let showHide=document.createElement("button");
addTransformManager(showHide);
showHide.id="showHideBtn";
showHide.innerText="▼";
sidebar.append(showHide);

sidebar.addEventListener("mouseenter",(e)=>
{
    e.stopPropagation();
    sidebar.show();
    
    
},{passive:true});
sidebar.addEventListener("mouseleave",(e)=>
{
    e.stopPropagation();
    sidebar.hide();
    
    
},{passive:true});
showHide.addEventListener("touchstart",(e)=>
{
    e.stopPropagation();
    sidebar.show();
    
},{passive:true});

var a=document.createElement("a");
a.className="sidebarElements";
a.innerText="Piece set:";
sidebar.append(a);

var sel=document.createElement("select");
sel.className="sidebarElements";
let pieceThemes=["Fantasy","Fantasy 2","Eyes","Skull","Katz","Freak","Classic"];
sel.value=pieceThemes[0];
for(let i=0;i<pieceThemes.length;i++)
{
    let o=document.createElement("option");
    o.innerText=pieceThemes[i];
    sel.append(o);
}
sel.addEventListener("change",function(e)
{
    console.log(sel.value);
    Pieces.forEach(function(e)
    {
        e.face.src=`Images/${sel.value}/${e.face.id}.png`;
        if(e.faceChg)
        e.faceChg();
    })
    
})
sidebar.append(sel);





var lab=document.createElement("h2");
lab.innerText="Theme color:";
sidebar.append(lab);