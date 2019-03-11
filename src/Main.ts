//衝突判定用の列挙
enum GraphicShape{
    NONE = Math.pow(2,0),
    CIECLE = Math.pow(2,1),
    BOX = Math.pow(2,2),
    LINE = Math.pow(2,3),
    DEAD_LINE = Math.pow(2,4),
}

//Boxの種類
enum BoxType{
    NORMAL,
    BOLD,
    FAST
}

//stageLevelの段階
enum StageLevel{
    ONE,
    TWO,
    THREE
}

class Main extends eui.UILayer {


    public constructor() {
        super();
        this.once(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
    }
 
    private addToStage() {
        GameObject.initial(this.stage);
        Util.init(this);//euiレイヤーのサイズの取得
        Game.init();
        egret.startTick(this.tickLoop, this);
    }

    tickLoop(timeStamp:number):boolean{
            GameObject.update();
            CreateWorld.worldBegin(timeStamp)

        return false;
    }

}

class Game{

    public static height: number;
    public static width: number;
    static gameOverFlag : boolean = false;
    static stageLevel : number = StageLevel.ONE;

    static init() {
        this.height = egret.MainContext.instance.stage.stageHeight;
        this.width  = egret.MainContext.instance.stage.stageWidth;
        Game.gameOverFlag = false;
        
        /* new メソッドを記入*/
        new Background();
        new MoveDisplay();
        new CreateWorld();
        new CreateObject();
        new MyBall(Game.width/2,Game.height-50,50);
        new Score();

    }


}


class Background extends GameObject{

    constructor() {
        super();

        this.shape = new egret.Shape();
        this.shape.graphics.beginFill(0x000080);
        this.shape.graphics.drawRect(0, 0, Game.width, Game.height);
        this.shape.graphics.endFill();
        GameObject.display.addChild(this.shape);
    }
    
    updateContent() {}
}

class CreateWorld extends PhysicsObject{

    static I : CreateWorld = null;

    constructor() {
        super();
        CreateWorld.I = this;
        this.createWorld();
        CreateWorld.world.on("beginContact",  this.collision, this);
        CreateWorld.world.on("endContact",  this.collisionEnd, this);
    }
    createWorld(){
        CreateWorld.world = new p2.World();
        CreateWorld.world.sleepMode = p2.World.BODY_SLEEPING;
        CreateWorld.world.gravity = [0, 9.8];

    }

    static worldBegin(dt : number) :boolean{
        if(Game.gameOverFlag == false){
            CreateWorld.world.step(1/60, dt/1000, 10);
        }
        return false;
    }

    //コリジョンイベントはここにまとめる
    private collision(evt : any){
        const bodyA: PhysicsObject = evt.bodyA;
        const bodyB: PhysicsObject = evt.bodyB;
        const shapeA : p2.Shape = evt.shapeA;
        const shapeB : p2.Shape = evt.shapeB;

        this.checkShape(shapeA, shapeB);
        


    }

    collisionEnd(){
            
    }

    checkShape(myShape :p2.Shape, yourShape : p2.Shape){

        //BallとBoxがぶつかったらゲームオーバー
        if(myShape.collisionGroup == GraphicShape.CIECLE && yourShape.collisionGroup == GraphicShape.BOX){
            Game.gameOverFlag = true;
            if(Game.gameOverFlag){
                new GameOver();
            }

        }
        else if(yourShape.collisionGroup == GraphicShape.CIECLE && myShape.collisionGroup == GraphicShape.BOX){
            Game.gameOverFlag = true;
            if(Game.gameOverFlag){
                new GameOver();
            }
        }
        //BallとLineがぶつかったらスコア加算
        else if(myShape.collisionGroup == GraphicShape.CIECLE && yourShape.collisionGroup == GraphicShape.LINE){
            Score.I.addScore();
            
            yourShape.collisionMask = GraphicShape.NONE;

        }
        else if(yourShape.collisionGroup == GraphicShape.CIECLE && myShape.collisionGroup == GraphicShape.LINE){
            Score.I.addScore();
            myShape.collisionMask = null;
        }
        else{

        }



    }

    addDestroyMethod(){CreateWorld.world.clear();}

    updateContent(){}

}

class CreateObject extends GameObject{

    constructor(){
        super();
        this.createBox();
    }

    createBox(){
        for(let i = 0; i < 6; i++){
            let posY = Game.height/2;
            new ScoreLine(Game.width/2, -2 * Game.height + posY*i,Game.width,0, ScoreLine.scoreLineColor);
            new RightBox(Game.width,-2 * Game.height + posY *i, 300, 50, MyBox.normalBoxColor);
            new LeftBox(0, - 2 *Game.height + posY *i, 300, 50, MyBox.normalBoxColor);


        }
    }

    updateContent(){
        switch(Score.I.score){
            case 0:
                Game.stageLevel = StageLevel.ONE;
                MyBox.sideMoveSpeed = 2;

                break;
            case 5:
                Game.stageLevel = StageLevel.TWO;
                MyBox.sideMoveSpeed = 2;
                
            break;
            case 10:
                Game.stageLevel = StageLevel.THREE;
                MyBox.sideMoveSpeed = 4;
            break;
        }
    }

}