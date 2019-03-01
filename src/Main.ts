class Main extends eui.UILayer {

    public constructor() {
        super();
        this.once(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
    }
 
    private addToStage() {
        GameObject.initial( this.stage );
        Game.init();
        egret.startTick(this.tickLoop, this);
    }

    tickLoop(timeStamp:number):boolean{
        GameObject.update();
        return false;
    }

}

class Game{

    public static height: number;
    public static width: number;

    static init() {
        this.height = egret.MainContext.instance.stage.stageHeight;
        this.width  = egret.MainContext.instance.stage.stageWidth;
        
        /* new メソッドを記入*/
    }


}


class Background extends GameObject{

    constructor() {
        super();

        this.shape = new egret.Shape();
        this.shape.graphics.beginFill(0x00c0e0);
        this.shape.graphics.drawRect(0, 0, Utility.width, Utility.height);
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
        CreateWorld.world.on("beginContact",  this.collision, this);

    }
    createWorld(){
        CreateWorld.world = new p2.World();
        CreateWorld.world.sleepMode = p2.World.BODY_SLEEPING;
        CreateWorld.world.gravity = [0, 9.8];

    }

    static worldBegin(dt : number) :boolean{
       
        CreateWorld.world.step(1/60, dt/1000, 10);
        return false;
    }

    //コリジョンイベントはここにまとめる
    private collision(evt : any){

    }

    addDestroyMethod(){CreateWorld.world.clear();}

    updateContent(){}
    collisionEvent(){}

}