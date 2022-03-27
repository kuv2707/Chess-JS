var turn=false;
var movestart=false;
var blackSquares="#6E1111";
var whiteSquares="#ffa1a1";
var boardOffsetX=(window.innerWidth/window.innerHeight>1)?window.innerWidth/2-320:0;
var boardOffsetY=25;
const Pieces=new Array();
var Theme;
/*
   mode should represent whether the device is capable of handling many animations
*/
const mode=window.innerWidth/window.innerHeight>1;
var labelInactive="black";
var labelActive="white"
var gameRules=
{
    rotatePerspective:{
        board:true,
        pieces:true//infact always true
    },
    highPerformance:false,
}
if(navigator.userAgent.includes("Win")||navigator.userAgent.includes("mac")||window.innerWidth/window.innerHeight>1.5)
{
    gameRules.highPerformance=true;
}

if(gameRules.highPerformance)
{
    gameRules.rotatePerspective.board=true;
    gameRules.rotatePerspective.pieces=true;
}
else
{
    gameRules.rotatePerspective.board=false;
    gameRules.rotatePerspective.pieces=true;
}