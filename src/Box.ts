class Box extends GameObject{
    
    constructor(x : number, y : number, width : number, height : number, color:number) {
        super();
        this.setShape(x, y, width, height, color);


    }

    

    setShape(x : number, y : number, width : number, height : number, color:number){
        if( this.shape ){
            GameObject.display.removeChild(this.shape);        
        }

        this.shape = new egret.Shape();
        this.shape.x = x;
        this.shape.y = y;
        this.shape.graphics.beginFill(color);
        this.shape.graphics.drawRect(0, 0, width , height);
        this.shape.graphics.endFill();
        GameObject.display.addChild(this.shape);
        
    }

    updateContent(){};

}


class PhysicsBox extends PhysicsObject{

    protected boxWidth :number;
    protected boxHeight :number;
    protected boxPositionX : number;
    protected boxPositionY : number;
    protected boxColor : number;
    static boxMove : boolean = false;
    static blockdownSpeed : number = 3;
    
    constructor(x : number, y : number, width : number, height : number, color:number) {
        super();
        this.boxPositionX = x;
        this.boxPositionY = y;
        this.boxWidth = width ;
        this.boxHeight =height;
        this.boxColor = color;
        this.setBody(x,y, width, height);
        this.setShape(this.boxWidth, this.boxHeight);


    }

    private setBody(x : number, y : number, width : number, height : number){

        this.body = new p2.Body({mass : 1, position:[x,y], type:p2.Body.STATIC});
        this.bodyShape = new p2.Box({
            width : width, height: height, fixedRotation:true, 
        });
        this.body.addShape(this.bodyShape);
        CreateWorld.world.addBody(this.body);
        
    }

    setShape(width: number, height : number){
        if( this.shape ){
            GameObject.display.removeChild(this.shape);        
        }

        this.shape = new egret.Shape();
        this.shape.anchorOffsetX += width/2;
        this.shape.anchorOffsetY += height/2;
        this.shape.x = this.body.position[0];
        this.shape.y = this.body.position[1];
        this.shape.graphics.beginFill(this.boxColor);
        this.shape.graphics.drawRect(0, 0, width , height);
        this.shape.graphics.endFill();
        GameObject.display.addChild(this.shape);
        
    }

    updateContent(){}
    collisionEvent(){}

}


class MyBox extends Box {

    constructor(x : number, y : number, width : number, height : number, color:number){
        super(x,y, width, height, color);
    }
}