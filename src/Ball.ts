class Ball extends GameObject{

    static I:Ball = null;   // singleton instance
    private radius :number =null;

    constructor(x : number, y:number, radius:number) {
        super();

        Ball.I = this;
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

class PhysicsBall extends PhysicsObject{

    static I:PhysicsBall = null;   // singleton instance
    private radius :number =null;

    constructor(x : number, y:number, radius:number) {
        super();

        PhysicsBall.I = this;
        this.setBody(x, y, radius);
        this.setShape(x, y, radius);

    }

    private setBody(x: number, y:number, radius: number){

        this.body = new p2.Body({mass : 1, position:[x,y]});
        this.bodyShape = new p2.Circle({
            radius : radius, fixedRotation:true
        });
        this.body.addShape(this.bodyShape);
        CreateWorld.world.addBody(this.body);
        
    }

    private setShape(x: number, y:number, radius: number){
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

/*    updateDrowShape(x: number, y:number, radius: number){
        this.shape.x = x;
        this.shape.y = y;
        GameObject.display.addChild(this.shape);
    }*/


    updateContent(){}
    collisionEvent(){}


}

