let sidebar=document.createElement("div");
sidebar.id="sideBarDiv";
document.body.append(sidebar);
sidebar.expanded=false;
sidebar.show=function()
{
    //table.style.marginLeft="250px";
    sidebar.style.height="250px";
    sidebar.expanded=true;
    showHide.innerText="▲";
    //console.log("shown sidebar")
}
sidebar.hide=function()
{
    //table.style.marginLeft="0px";
    sidebar.style.height="25px";
    sidebar.expanded=false;
    showHide.innerText="▼";
}
sidebar.toggle=function()
{
    if(sidebar.expanded)
    sidebar.hide();
    else
    sidebar.show();
}
let showHide=document.createElement("button");
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
    
});

