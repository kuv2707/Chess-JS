let sidebar=document.createElement("div");
sidebar.id="sideBarDiv";
document.body.append(sidebar);
sidebar.expanded=false;
sidebar.show=function()
{
    //table.style.marginLeft="250px";
    sidebar.style.width="250px";
    sidebar.expanded=true;
}
sidebar.hide=function()
{
    //table.style.marginLeft="0px";
    sidebar.style.width="0px";
    sidebar.expanded=false;
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

showHide.onclick=function()
{
    sidebar.toggle();
    console.log("doint")
}

