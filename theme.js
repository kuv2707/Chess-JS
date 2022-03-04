const setTheme=function(theme)
{
    Theme=theme;
    theme.chromeTheme=theme.elems;
    whiteSquares=theme.ws;
    blackSquares=theme.bs;
    document.querySelector('meta[name="theme-color"]').setAttribute('content', theme.chromeTheme);
    colorSelector.style.backgroundColor=theme.elems;
    labelW.style.backgroundColor=theme.elems;
    labelB.style.backgroundColor=theme.elems;
    sidebar.style.backgroundColor=theme.elems;
    let sty=document.body.style;
    sty.background=`linear-gradient(180deg,${theme.grad1},${theme.grad2},${theme.grad3})`;
    sty.backgroundRepeat="no-repeat"
    sty.backgroundAttachment="fixed";
    chessBoard.refresh();
    activeShadow="#d1dfe5";
    if(theme.baseColor.red+theme.baseColor.green+theme.baseColor.blue>320)
    {
        labelActive=getPercentColor(theme.baseColor,7);
    }
    else
    {
        labelActive="white";
    }
    tentativeMove.greenCol=theme.moveHighlight;
}

function createTheme({red,green,blue})
{
    var bs=getPercentColor({red,green,blue},60);
    var ws=getPercentColor({red,green,blue},140);
    var grad1=getPercentColor({red,green,blue},5);
    var grad2=getPercentColor({red,green,blue},40);
    var grad3=getPercentColor({red,green,blue},100);
    var elems=getPercentColor({red,green,blue},100);
    var moveHighlight=getPercentColor({red:green,green:blue,blue:red},180);
    return{
        bs,ws,grad1,grad2,grad3,elems,baseColor:{red,green,blue},moveHighlight
    };
}
function getPercentColor({red,green,blue},percent)
{
    var red=red*percent/100;
    red=red>255?255:red;
    var green=green*percent/100;
    green=green>255?255:green;
    var blue=blue*percent/100;
    blue=blue>255?255:blue;
    return `rgb(${red} ${green} ${blue})`;
}

function HexToRGB(hexcol)
{
    return{
        red:parseInt(hexcol.substring(1,3),16),
        green:parseInt(hexcol.substring(3,5),16),
        blue:parseInt(hexcol.substring(5,7),16)
    }
}
var defaultTheme=createTheme({red:57,green:155,blue:162});
//defaultTheme.moveHighlight=tentativeMove.greenCol;
setTheme(defaultTheme);

colorSelector.value="#399BA2";