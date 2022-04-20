var x,y;
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
        let k=document.createElement("img");
        k.id=type;
        k.style.zIndex="3";
        k.alt=symbols[type][0];
        k.className="ChessPiece";
        k.src=`Images/${sel.value}/${type}.png`;
        this.face=k;
        this.face.soul=this;
        addTransformManager(k);
        this.face.addEventListener("mousedown",this.mouseD)
        this.face.addEventListener("touchstart",this.mouseD,{passive:false})
        this.face.addEventListener("mouseenter",this.mouseEnter)
        this.face.addEventListener("mouseleave",this.mouseLeave)
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
         * 
         */
        return this.movegive();
    }
    get typeOfPiece()
    {
        return this.face.id;
    }
    get body()
    {
        return this.face;
    }
    mouseEnter()
    {
        if(turn!=this.soul.team)
        return;
        this.scale(9/8,9/8);
        this.style.setProperty("filter","drop-shadow(0 0 10px black)")
        //console.log(this.soul);
    }
    mouseLeave()
    {
        //console.log(this);
        this.scale(1,1);
        this.style.setProperty("filter","none");
        //console.log(this.soul);
    }
    static drag=function(e)
    {
        e.stopPropagation();
        e.preventDefault();
        currentlySelected.face.style.transitionProperty="none";
        var xy=getXY(e,true);
        currentlySelected.face.move(xy.x-x,xy.y-y);
        tentativeMove.setXY(Math.floor((xy.x-boardOffsetX)/80),
        Math.floor((xy.y-boardOffsetY)/80));
    }
    mouseD(e)
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
        document.addEventListener("mousemove",Piece.drag)
        document.addEventListener("touchmove",Piece.drag,{passive:false})
        this.scale(120/80);
        document.addEventListener("mouseup",Piece.docmu)
        document.addEventListener("touchend",Piece.docmu)
        tentativeMove.setListen(true);
        e.stopPropagation();
    }
    static docmu=function(e)
    {
        document.removeEventListener("mousemove",Piece.drag)
        document.removeEventListener("touchmove",Piece.drag,{passive:false})
        document.removeEventListener("mouseup",Piece.docmu)
        document.removeEventListener("touchend",Piece.docmu)
        currentlySelected.mu(e);
        tentativeMove.setListen(false);
    }

    mu=function(e)
    {
        movestart=false;
        
        var xy=getXY(e,true);
        setTimeout(()=>e.target.style.zIndex="3",850);//e.target is same as this object
        this.face.scale(9/8,9/8);
        this.face.style.transitionProperty="transform";
        document.removeEventListener("mousemove",Piece.drag)
        document.removeEventListener("touchmove",Piece.drag)
        let vx=Math.floor((xy.x)/80);
        let vy=Math.floor((xy.y)/80);
        console.log(vx,vy);
        chessBoard.clear("move");
        if(!(vx>=8 ||  vy>=8  ||  vx<0  ||  vy<0))
        {
            /**
             * a successful turn is when:
             * vx,vy is contained in this piece's allowed moves
             * "already" is null
             * or it is of different team
             */
            let am=this.getAllowedMoves();
            let legal=false;
            for(let i=0;i<am.length;i++)
            {
                if(  (am[i].x==vx)  &&  (am[i].y==vy))
                {
                    //moved within allowed bounds
                    legal=true;
                }
            }
            if(legal)
            {
                var already=BOARD[vx][vy];//indexoutofbounds exception never occurs
                if(this.symbolFEN=="P"|| this.symbolFEN=="p")
                {
                    //check if this very piece did an enpassant
                    let now=this.location;
                    let x=now.x/80;
                    let y=now.y/80;
                    if(vy-y==2  ||  vy-y==-2)
                    {
                        enPassantLoc.x=x;
                        enPassantLoc.y=(y+vy)/2;
                        enPassantLoc.expiryMove=turnCount+1;
                        enPassantLoc.pawn=this;
                        chessBoard.clear("enp");
                        chessBoard.highlight({...enPassantLoc,color:"orange",purpose:"enp"})
                    }

                    //check if this very piece is capable of capturing an enpassant
                    if(enPassantLoc.x==vx  &&  enPassantLoc.y==vy)
                    {
                        already=enPassantLoc.pawn;
                    }
                }
                
                if(already==null)
                {
                    BOARD[Math.floor(this.location.x/80)][Math.floor(this.location.y/80)]=null;
                    this.setLocation(vx*80,vy*80)
                    BOARD[Math.floor(this.location.x/80)][Math.floor(this.location.y/80)]=this;
                    switchTurn();
                }
                else
                {
                    if(!(already.team==this.team))
                    {
                        kill(already);
                        BOARD[Math.floor(this.location.x/80)][Math.floor(this.location.y/80)]=null;
                        this.setLocation(vx*80,vy*80)
                        BOARD[Math.floor(this.location.x/80)][Math.floor(this.location.y/80)]=this;
                        switchTurn();
                    }
                    
                }
                



            }


        }
        this.face.move(this.location.x,this.location.y);
    }
}




