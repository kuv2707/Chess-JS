var x=0,y=0;
/**
 * 
 */
var currentlySelected;
var symbols=
{
    br:["♜",rookMoves,4,"r"],
    bn:["♞",knightMoves,3,"n"],
    bq:["♛",queenMoves,5,"q"],
    bk:["♚",kingMoves,6,"k"],
    bb:["♝",bishopMoves,2,"b"],
    bp:["♟",pawnMoves,1,"p"],

    wr:["♖",rookMoves,4,"R"],
    wn:["♘",knightMoves,3,"N"],
    wq:["♕",queenMoves,5,"Q"],
    wk:["♔",kingMoves,6,"K"],
    wb:["♗",bishopMoves,2,"B"],
    wp:["♙",pawnMoves,1,"P"],
    
}
class Piece
{
    //to be replaced by a fenstring consisting of initial arrangement of board
    static face=["br","bn","bb","bq","bk","bb","bn","br","bp","bp","bp","bp","bp","bp","bp","bp",
            "wp","wp","wp","wp","wp","wp","wp","wp","wr","wn","wb","wk","wq","wb","wn","wr"];

    /**
     * 
     * @param {boolean} team team of the piece:true means white, false means black
     * @param {{x:Number;y:Number}} location object storing x and y coordinates, ranging from 0 to 560 (8 squares)
     */
    constructor(team,location,type)
    {
        this.team=team;
        this.location=location;
        this.alive=true;
        this.symbol=symbols[type][0];
        this.movegive=symbols[type][1];
        this.weight=symbols[type][2];
        this.symbolFEN=symbols[type][3];
        this.legMovs={turn:-1,moves:[]}
        let k=document.createElement("img");
        k.id=type;
        k.style.zIndex="3";
        k.alt=symbols[type][0];
        k.style.color=(team===BLACK_TEAM)?"black":"white";
        k.className="ChessPiece";
        k.src=`Images/${sel.value}/${type}.png`;
        this.face=k;
        this.face.soul=this;
        addTransformManager(k);
        this.face.addEventListener("contextmenu",function(e)
        {
            e.preventDefault();
            e.stopPropagation();
        });
        this.face.addEventListener("pointerdown",Piece.mouseD)
        this.face.addEventListener("mouseenter",Piece.mouseEnter)
        this.face.addEventListener("mouseleave",Piece.mouseLeave)
    }
    /**
     *  
     * @param {Number} x x coordinate
     * @param {Number} y y coordinate
     */
    setLocation(x,y)
    {
        this.location.x=x;
        this.location.y=y;
    }
    getAllowedMoves()
    {
        /**
         * filter out those moves which might lead to check
         * store move array to reduce processing on repeated calls to this function
         */
        if(this.legMovs.turn==turnCount){}
        else
        {
            let k=this.movegive();
            this.legMovs.turn=turnCount;
            this.legMovs.moves=k;
        }
        return this.legMovs.moves;
    }
    static mouseEnter()
    {
        if(turn!=this.soul.team)
        return;
        this.scale(9/8,9/8);
        this.style.setProperty("filter","drop-shadow(0 0 10px black)")
    }
    static mouseLeave()
    {
        this.scale(1,1);
        this.style.setProperty("filter","none");
    }
    static drag=function(e)
    {
        e.stopPropagation();
        e.preventDefault();
        this.style.transitionProperty="none";
        var xy=getXY(e,true);
        this.move(xy.x-x,xy.y-y);
        tentativeMove.setXY(Math.floor((xy.x)/80),
        Math.floor((xy.y)/80));
    }
    static mouseD(e)
    {
        if(turn!=this.soul.team)
        return;
        e.preventDefault();
        var xy=getXY(e,false);
        this.style.zIndex="4";
        x=Number(xy.x-this.translateCoords.x);
        y=Number(xy.y-this.translateCoords.y);
        currentlySelected=this.soul;
        var am=currentlySelected.getAllowedMoves();
        am.forEach(function(val)
        {
            chessBoard.highlight({x:val.x,y:val.y,color:val.kill?"red":"pink",purpose:"move"});
        })
        movestart=true;
        this.setPointerCapture(e.pointerId)
        this.addEventListener("pointermove",Piece.drag)
        this.scale(120/80);
        this.addEventListener("pointerup",Piece.mu)
        tentativeMove.setListen(true);
        e.stopPropagation();
    }
    static mu=function(e)
    {
        if(this.soul!=currentlySelected)
        return;
        currentlySelected=null;
        tentativeMove.setListen(false);
        movestart=false;
        let guiElem=this;
        let thisPiece=this.soul;
        var xy=getXY(e,true);
        e.target.style.zIndex="3";
        guiElem.scale(9/8,9/8);
        guiElem.style.transitionProperty="transform";
        
        guiElem.removeEventListener("pointermove",Piece.drag)
        let vx=Math.floor((xy.x)/80);
        let vy=Math.floor((xy.y)/80);
        chessBoard.clear("move");
        if(!(vx>=8 ||  vy>=8  ||  vx<0  ||  vy<0))
        {
            /**
             * a successful turn is when:
             * vx,vy is contained in this piece's allowed moves
             * "already" is null
             * or it is of different team
             */
            let am=thisPiece.getAllowedMoves();
            let legal=false;
            for(let i=0;i<am.length;i++)
            {
                if((am[i].x==vx)  &&  (am[i].y==vy))
                {
                    //moved to a legal location
                    legal=true;
                }
            }
            if(legal)
            {
                var already=BOARD[vx][vy];//indexoutofbounds exception never occurs
                if(thisPiece.symbolFEN=="P"|| thisPiece.symbolFEN=="p")
                {
                    //check if this very piece did an enpassant
                    let now=thisPiece.location;
                    let x=now.x/80;
                    let y=now.y/80;
                    if(vy-y==2  ||  vy-y==-2)
                    {
                        enPassantLoc.x=x;
                        enPassantLoc.y=(y+vy)/2;
                        enPassantLoc.expiryMove=turnCount+1;
                        enPassantLoc.pawn=thisPiece;
                        chessBoard.clear("enp");
                        chessBoard.highlight({...enPassantLoc,color:"orange",purpose:"enp"})
                    }
                    //check if this very piece is capable of capturing an enpassant
                    if(enPassantLoc.x==vx  &&  enPassantLoc.y==vy)
                    {
                        already=enPassantLoc.pawn;
                    }
                }
                if(thisPiece.symbolFEN=="R"|| thisPiece.symbolFEN=="r")
                {
                    thisPiece.NOTcastlable=true;
                }
                if(already==null)
                {
                    BOARD[Math.floor(thisPiece.location.x/80)][Math.floor(thisPiece.location.y/80)]=null;
                    this.soul.setLocation(vx*80,vy*80)
                    BOARD[Math.floor(thisPiece.location.x/80)][Math.floor(thisPiece.location.y/80)]=thisPiece;
                    switchTurn();
                }
                else
                {
                    if(!(already.team==thisPiece.team))
                    {
                        kill(already,xy.x,xy.y);
                        BOARD[Math.floor(thisPiece.location.x/80)][Math.floor(thisPiece.location.y/80)]=null;
                        thisPiece.setLocation(vx*80,vy*80)
                        BOARD[Math.floor(thisPiece.location.x/80)][Math.floor(thisPiece.location.y/80)]=thisPiece;
                        switchTurn();
                    }
                }
            }
        }
        guiElem.move(thisPiece.location.x,thisPiece.location.y);
    }
}




