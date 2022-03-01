var turn=false;
var blackSquares="#6E1111";
var whiteSquares="#ffa1a1";
var boardOffsetX=(window.innerWidth/window.innerHeight>1)?window.innerWidth/2-320:0;
const boardOffsetY=25;
const Pieces=new Array();
var activeShadow="#d1dfe5";
var inactiveShadow="black";
var Theme;
/*
   mode should represent whether the device is capable of handling many animations
*/
const mode=window.innerWidth/window.innerHeight>1;
var labelInactive="black";
var labelActive="white"
if(mode)
{
    
}
else
{
    activeShadow="black";
}
