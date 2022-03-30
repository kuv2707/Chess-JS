var x,y;
var currentlySelected;

var symbols=
{
    br:["♜",rookMoves,4],
    bn:["♞",knightMoves,3],
    bq:["♛",queenMoves,5],
    bk:["♚",kingMoves,6],
    bb:["♝",bishopMoves,2],
    bp:["♟",pawnMoves,1],
    wr:["♖",rookMoves,4],
    wn:["♘",knightMoves,3],
    wq:["♕",queenMoves,5],
    wk:["♔",kingMoves,6],
    wb:["♗",bishopMoves,2],
    wp:["♙",pawnMoves,1],
    
}
class Piece
{
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
        let k=document.createElement("img");
        k.id=type;
        k.style.zIndex="3";
        k.alt=symbols[type][0];
        k.className="ChessPiece";
        k.src="Images/Fantasy/"+type+".png";
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
        //console.log(this.soul);
    }
    mouseLeave()
    {
        //console.log(this);
        this.scale(1,1);
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
        chessBoard.highlight(currentlySelected.getAllowedMoves());
        movestart=true;
        //console.log(currentlySelected,currentlySelected.getAllowedMoves())
        document.addEventListener("mousemove",Piece.drag)
        document.addEventListener("touchmove",Piece.drag)
        this.scale(100/80);
        document.addEventListener("mouseup",Piece.docmu)
        document.addEventListener("touchend",Piece.docmu)
        tentativeMove.setListen(true);
        e.stopPropagation();
    }
    static docmu=function(e)
    {
        document.removeEventListener("mousemove",Piece.drag)
        document.removeEventListener("touchmove",Piece.drag)
        document.removeEventListener("mouseup",Piece.docmu)
        document.removeEventListener("touchend",Piece.docmu)
        currentlySelected.mu(e);
        tentativeMove.setListen(false);
    }

    mu=function(e)
    {
        movestart=false;
        chessBoard.refresh();//COSTLIER THAN IT SHOULD BE:MAKE A FUNCTION TO REVERT HIGHLIGHTED SQUARES
        var xy=getXY(e,true);
        setTimeout(()=>e.target.style.zIndex="3",850);//e.target is same as this object
        this.face.scale(1);
        this.face.style.transitionProperty="transform";
        document.removeEventListener("mousemove",Piece.drag)
        document.removeEventListener("touchmove",Piece.drag)
        let vx=Math.floor((xy.x-boardOffsetX)/80)*80;
        let vy=Math.floor((xy.y-boardOffsetY)/80)*80;
        
        if(!(vx>=640 ||  vy>=640  ||  vx<0  ||  vy<0))
        {
            /**
             * a successful turn is when:
             * vx/80,vy/80 is contained in this piece's allowed moves
             * already is null
             * or it is of different team
             */
            let am=this.getAllowedMoves();
            let legal=false;
            for(let i=0;i<am.length;i++)
            {
                if(  (am[i].x==Math.floor(vx/80))  &&  (am[i].y==Math.floor(vy/80)))
                {
                    //moved within allowed bounds
                    legal=true;
                }
            }
            if(legal)
            {
                var already=BOARD[vx/80][vy/80];//indexoutofbounds exception never occurs
                if(already==null)
                {
                    BOARD[Math.floor(this.location.x/80)][Math.floor(this.location.y/80)]=null;
                    this.setLocation(vx,vy)
                    BOARD[Math.floor(this.location.x/80)][Math.floor(this.location.y/80)]=this;
                    switchTurn();
                }
                else
                {
                    if(!(already.team==this.team))
                    {
                        kill(already);
                        //console.log(vx,vy);
                        //repitition
                        BOARD[Math.floor(this.location.x/80)][Math.floor(this.location.y/80)]=null;
                        this.setLocation(vx,vy)
                        BOARD[Math.floor(this.location.x/80)][Math.floor(this.location.y/80)]=this;
                        switchTurn();
                    }
                    
                }
            }
        }
        this.face.move(this.location.x+boardOffsetX,this.location.y+boardOffsetY);
    }
}




