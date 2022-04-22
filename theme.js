const setTheme=function(theme)
{
    Theme=theme;
    theme.chromeTheme=theme.elems;
    whiteSquares=theme.ws;
    blackSquares=theme.bs;
    document.querySelector('meta[name="theme-color"]').setAttribute('content', theme.chromeTheme);
    colorSelector.style.backgroundColor=theme.elems;
    sidebar.style.backgroundColor=getPercentColor(theme.baseColor,85);
    let sty=document.body.style;
    sty.backgroundColor=theme.elems;
    sty.backgroundImage=`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='258' height='258' viewBox='0 0 800 800'%3E%3Cg fill='none' stroke='${getPercentColor(theme.baseColor,85)}' stroke-width='3.3'%3E%3Cpath d='M769 229L1037 260.9M927 880L731 737 520 660 309 538 40 599 295 764 126.5 879.5 40 599-197 493 102 382-31 229 126.5 79.5-69-63'/%3E%3Cpath d='M-31 229L237 261 390 382 603 493 308.5 537.5 101.5 381.5M370 905L295 764'/%3E%3Cpath d='M520 660L578 842 731 737 840 599 603 493 520 660 295 764 309 538 390 382 539 269 769 229 577.5 41.5 370 105 295 -36 126.5 79.5 237 261 102 382 40 599 -69 737 127 880'/%3E%3Cpath d='M520-140L578.5 42.5 731-63M603 493L539 269 237 261 370 105M902 382L539 269M390 382L102 382'/%3E%3Cpath d='M-222 42L126.5 79.5 370 105 539 269 577.5 41.5 927 80 769 229 902 382 603 493 731 737M295-36L577.5 41.5M578 842L295 764M40-201L127 80M102 382L-261 269'/%3E%3C/g%3E%3Cg fill='${getPercentColor(theme.baseColor,45)}'%3E%3Ccircle cx='769' cy='229' r='6'/%3E%3Ccircle cx='539' cy='269' r='6'/%3E%3Ccircle cx='603' cy='493' r='6'/%3E%3Ccircle cx='731' cy='737' r='6'/%3E%3Ccircle cx='520' cy='660' r='6'/%3E%3Ccircle cx='309' cy='538' r='6'/%3E%3Ccircle cx='295' cy='764' r='6'/%3E%3Ccircle cx='40' cy='599' r='6'/%3E%3Ccircle cx='102' cy='382' r='6'/%3E%3Ccircle cx='127' cy='80' r='6'/%3E%3Ccircle cx='370' cy='105' r='6'/%3E%3Ccircle cx='578' cy='42' r='6'/%3E%3Ccircle cx='237' cy='261' r='6'/%3E%3Ccircle cx='390' cy='382' r='6'/%3E%3C/g%3E%3C/svg%3E")`;
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