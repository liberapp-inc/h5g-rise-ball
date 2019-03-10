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


abstract class PhysicsBox extends PhysicsObject{

    protected boxWidth :number;
    protected boxHeight :number;
    protected boxPositionX : number;
    protected boxPositionY : number;
    protected boxColor : number;
    //static boxMove : boolean = false;
    //static blockdownSpeed : number = 3;
    
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
            width : width, height: height, fixedRotation:true, collisionGroup: GraphicShape.BOX, collisionMask:GraphicShape.CIECLE
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

    protected updateDrowShape(x: number, y:number){
        this.shape.x = x;
        this.shape.y = y;
        GameObject.display.addChild(this.shape);
    }

/*    updateContent(){}
    collisionEvent(){}*/

}


class MyBox extends PhysicsBox {

    private moveDisplayPosX : number;
    private moveDisplayPosY : number;
    protected static sideMoveSpeed : number = 2;
    protected rightMoveFlag : boolean = true;

    constructor(x : number, y : number, width : number, height : number, color:number){
        super(x,y, width, height, color);
        this.moveDisplayPosX = MoveDisplay.display.x;
        this.moveDisplayPosY = MoveDisplay.display.y;
    }

    //GameObjectのdisplayに子オブジェクトのMoveDisPlayにadd
    setShape(width: number, height : number){
        if( this.shape ){
            MoveDisplay.display.removeChild(this.shape);        
        }

        this.shape = new egret.Shape();
        this.shape.anchorOffsetX += width/2;
        this.shape.anchorOffsetY += height/2;
        this.shape.x = this.body.position[0];
        this.shape.y = this.body.position[1];
        this.shape.graphics.beginFill(this.boxColor);
        this.shape.graphics.drawRect(0, 0, width , height);
        this.shape.graphics.endFill();
        MoveDisplay.display.addChild(this.shape);
        
    }

    //MoveDisplayが移動したとき、shapeは移動するが、bodyは移動しないのでその補正
    protected updateBodyShape(){
        this.body.position[0] += MoveDisplay.moveSpeed[0];
        this.body.position[1] += MoveDisplay.moveSpeed[1];
        this.shape.x = this.body.position[0];
        this.shape.y = this.body.position[1];
        MoveDisplay.display.addChild(this.shape);
        if(this.shape.y > 2 * Game.height){
            this.body.position[1] -= Game.height*3;

        }
        
        

    }
    
    addDestroyMethod(){
        if( this.shape ){
            MoveDisplay.display.removeChild(this.shape);
            this.shape = null;
        }

    }

    updateContent(){
        this.updateBodyShape();
        //this.sideMove();
    }
}

class RightBox extends MyBox{
    constructor(x : number, y : number, width : number, height : number, color:number){
        super(x,y, width, height, color);

    }

    protected sideMove(){
        if(this.rightMoveFlag === true){
            this.shape.x += MyBox.sideMoveSpeed;
            this.body.position[0] += MyBox.sideMoveSpeed;
            if(this.shape.x >= Game.width){this.rightMoveFlag = false;}
        }
        else if(this.rightMoveFlag === false){
            this.shape.x -= MyBox.sideMoveSpeed;
            this.body.position[0] -= MyBox.sideMoveSpeed;
            if(this.shape.x <= Game.width/2 + this.shape.width/2){this.rightMoveFlag = true;}
        }
    }



    updateContent(){
        if(Game.gameOverFlag == false){
            this.updateBodyShape();
            this.sideMove();

        }
    }    
    
    
}

class LeftBox extends MyBox{
    constructor(x : number, y : number, width : number, height : number, color:number){
        super(x,y, width, height, color);

    }

    protected sideMove(){
        if(this.rightMoveFlag === true){
            this.shape.x += MyBox.sideMoveSpeed;
            this.body.position[0] += MyBox.sideMoveSpeed;
            if(this.shape.x >= Game.width/2 - this.shape.width/2){this.rightMoveFlag = false;}
        }
        else if(this.rightMoveFlag === false){
            this.shape.x -= MyBox.sideMoveSpeed;
            this.body.position[0] -= MyBox.sideMoveSpeed;
            if(this.shape.x <= 0){this.rightMoveFlag = true;}
        }
    }

    updateContent(){
        if(Game.gameOverFlag == false){
            this.updateBodyShape();
            this.sideMove();

        }
    }    
    
    
}