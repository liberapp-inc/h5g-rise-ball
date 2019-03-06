class Ball extends GameObject{

    static I:Ball = null;   // singleton instance
    private radius :number =null;

    constructor(x : number, y:number, radius:number) {
        super();
        this.setShape(x, y, radius);

    }


    setShape(x: number, y:number, radius: number){
        if( this.shape ){
            GameObject.display.removeChild(this.shape);        
        }

        this.shape = new egret.Shape();
        this.shape.x = x;
        this.shape.y = y;
        this.shape.graphics.beginFill(0xff0000);
        this.shape.graphics.drawCircle(0, 0, radius);
        this.shape.graphics.endFill();
        GameObject.display.addChild(this.shape);
        
    }

/*    updateDrowShape(){
        this.shape.x = this.body.position[0];
        this.shape.y = this.body.position[1];
        GameObject.display.addChild(this.shape);
    }*/


    updateContent(){


    }


}

abstract class PhysicsBall extends PhysicsObject{

    //static I:PhysicsBall = null;   // singleton instance
    protected radius :number =null;

    constructor(x : number, y:number, radius:number) {
        super();

        //PhysicsBall.I = this;
        this.radius = radius;
        this.setBody(x, y, radius);
        this.setShape(x, y, radius);

    }

    protected setBody(x: number, y:number, radius: number){

        this.body = new p2.Body({mass : 1, position:[x,y]});
        this.bodyShape = new p2.Circle({
            radius : radius, fixedRotation:true
        });
        this.body.addShape(this.bodyShape);
        CreateWorld.world.addBody(this.body);
        
    }

    protected setShape(x: number, y:number, radius: number){
        if( this.shape ){
            GameObject.display.removeChild(this.shape);        
        }

        this.shape = new egret.Shape();
        this.shape.x = x;
        this.shape.y = y;
        this.shape.graphics.beginFill(0xff0000);
        this.shape.graphics.drawCircle(0, 0, radius);
        this.shape.graphics.endFill();
        GameObject.display.addChild(this.shape);
        
    }

    updateDrowShape(x: number, y:number, radius: number){
        this.shape.x = x;
        this.shape.y = y;
        GameObject.display.addChild(this.shape);
    }


/*    updateContent(){}
    collisionEvent(){}*/


}

class MyBall extends PhysicsBall{

    static I : MyBall = null; 
    constructor(x : number, y:number, radius:number) {
        super(x , y, radius);
        MyBall.I = this;
        GameObject.display.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (e: egret.TouchEvent) => MyBall.touch(e), false);

    }


    static touch(evt : egret.TouchEvent){
        if(Game.gameOverFlag == false){
            MyBall.I.body.applyForce([0,-5000],[0,0]);

        }
    }

    updateContent(){
        this.updateDrowShape(this.body.position[0], this.body.position[1], this.radius);
    }

    collisionEvent(){}

}