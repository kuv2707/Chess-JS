let sidebar=document.createElement("div");
sidebar.id="sideBarDiv";
document.body.append(sidebar);
sidebar.expanded=false;
sidebar.show=function()
{
    //table.style.marginLeft="250px";
    sidebar.style.height="250px";
    sidebar.expanded=true;
    console.log("shown sidebar")
}
sidebar.hide=function()
{
    //table.style.marginLeft="0px";
    sidebar.style.height="25px";
    sidebar.expanded=false;
    console.log("hid sidebar")
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
showHide.innerText="☰";
document.body.append(showHide);
showHide.addEventListener("touch",(e)=>
{
    e.stopPropagation();
    sidebar.toggle();
    
},{passive:true});
showHide.addEventListener("click",(e)=>
{
    e.stopPropagation();
    sidebar.toggle();
    
},{passive:true});

