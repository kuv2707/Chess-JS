const setTheme=function(theme)
{
    Theme=theme;
    theme.chromeTheme=theme.elems;
    whiteSquares=theme.ws;
    blackSquares=theme.bs;
    document.querySelector('meta[name="theme-color"]').setAttribute('content', theme.chromeTheme);
    colorSelector.style.backgroundColor=theme.elems;
    sidebar.style.backgroundColor=theme.grad3;
    let sty=document.body.style;
    sty.backgroundColor=getPercentColor(theme.baseColor,50);
    sty.backgroundRepeat="no-repeat"
    sty.backgroundAttachment="fixed";
    chessBoard.refresh();
    activeShadow="#d1dfe5";
    tentativeMove.greenCol=theme.moveHighlight;
    //add this theme to local storage
    window.localStorage.setItem("theme",`{"red":"${theme.baseColor.red}","green":"${theme.baseColor.green}","blue":"${theme.baseColor.blue}"}`);
}
/**
 * 
 * @param {any} param0 color object storing rgb values as numbers
 * @returns theme object consisting of different shades of color accepted, in css style string
 */
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
        bs,ws,grad1,grad2,grad3,elems,baseColor:{red:Number(red),green:Number(green),blue:Number(blue)},moveHighlight
    };
}
/**
 * 
 * @param {any} param0 color object storing rgb values as numbers
 * @param {Number} percent percentage of rgb in final color
 * @returns css style string of color adjusted to specified percentage of rgb
 */
function getPercentColor({red,green,blue},percent)
{
    var red=red*percent/100;
    var green=green*percent/100;
    var blue=blue*percent/100;
    return `rgb(${red>255?255:red} ${green>255?255:green} ${blue>255?255:blue})`;
}

function HexToRGB(hexcol)
{
    return{
        red:parseInt(hexcol.substring(1,3),16),
        green:parseInt(hexcol.substring(3,5),16),
        blue:parseInt(hexcol.substring(5,7),16)
    }
}
/**
 * 
 * @param {String} st hex number containing 1 or 2 digits
 * @returns hex number padded with 0 to make it 2 digits long
 */
function TwoDig(st)
{
    if(st.length==1)
    return '0'+st;
    else
    return st;
}
//maybe use Array.slice
function RGBtoHex(a,b,c)
{
    return "#"+TwoDig(a.toString(16))+TwoDig(b.toString(16))+TwoDig(c.toString(16));
}
var defaultTheme=createTheme({red:57,green:155,blue:162});



//search for default theme in cookie
/**
 * deprecating cookies in favor of window.localStorage
 */
let vals=[];
let savedthemestr=window.localStorage.getItem("theme");
if(savedthemestr)
{
    let savedTheme=JSON.parse(savedthemestr);
    defaultTheme=createTheme(savedTheme);
}

colorSelector.value=RGBtoHex(defaultTheme.baseColor.red,defaultTheme.baseColor.green,defaultTheme.baseColor.blue)
setTheme(defaultTheme);


//useless now
//copied from net
function setCookie(name,value,exp_days=30) {
    var d = new Date();
    d.setTime(d.getTime() + (exp_days*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}
//self made
function getCookie(name)
{
    let cookies=decodeURIComponent(document.cookie).split(";");
    for(let k=0;k<cookies.length;k++)
    {
        if(cookies[k].includes(name))
        {
            return cookies[k];
        }
    }
    return null;
}