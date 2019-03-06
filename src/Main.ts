class Main extends eui.UILayer {


    public constructor() {
        super();
        this.once(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
    }
 
    private addToStage() {
        GameObject.initial(this.stage);
        //MainCamera.initial(this.stage);
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

    static init() {
        this.height = egret.MainContext.instance.stage.stageHeight;
        this.width  = egret.MainContext.instance.stage.stageWidth;
        Game.gameOverFlag = false;
        
        /* new メソッドを記入*/
        new Background();
        new MoveDisplay();
        new CreateWorld();
        new MyBall(Game.width/2,Game.height-50,50);
        new CreateObject();
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
/*        const bodyA: PhysicsObject = evt.bodyA;
        const bodyB: PhysicsObject = evt.bodyB;
        const shapeA : PhysicsObject = evt.shapeA;
        const shapeB : PhysicsObject = evt.shapeB;*/

        Game.gameOverFlag = true;
        if(Game.gameOverFlag === true){

            new GameOver();
        }

    }

    addDestroyMethod(){CreateWorld.world.clear();}

    updateContent(){}
    collisionEvent(){}

}

class CreateObject extends GameObject{

    private box :Box[] = [];

    constructor(){
        super();
        this.createBox();
    }

    createBox(){
        for(let i = 0; i < 2; i++){
            let posY = Game.height/2
            let rb = new RightBox(Game.width,posY *i, 300, 50, 0xff0000);
            let lb = new LeftBox(0,posY *i, 300, 50, 0xff0000);
            let l = new ScoreLine(Game.width/2, posY*i,Game.width,0, 0xff0000);
            this.box.push(rb);
            this.box.push(lb);
            this.box.push(l);

        }
    }

    updateContent(){}

}