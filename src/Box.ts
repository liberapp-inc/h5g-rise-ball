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
    static sideMoveSpeed : number = 2;
    public mySideSpeed :number = 1;
    protected rightMoveFlag : boolean = true;
    protected boxType: number = BoxType.NORMAL;
    static normalBoxColor : number = 0xff0000;
    static boldBoxColor : number = 0x8a2be2;
    static fastBoxColor : number = 0x7fff00;

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
            //画面外で一度削除
            this.destroy();
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
    }
}

class RightBox extends MyBox{
    constructor(x : number, y : number, width : number, height : number, color:number){
        super(x,y, width, height, color);

    }

    protected sideMove(){
        if(this.rightMoveFlag === true){
            this.shape.x += MyBox.sideMoveSpeed * this.mySideSpeed;
            this.body.position[0] += MyBox.sideMoveSpeed* this.mySideSpeed;
            if(this.shape.x >= Game.width){this.rightMoveFlag = false;}
        }
        else if(this.rightMoveFlag === false){
            this.shape.x -= MyBox.sideMoveSpeed * this.mySideSpeed;
            this.body.position[0] -= MyBox.sideMoveSpeed * this.mySideSpeed;
            if(this.shape.x <= Game.width/2 + this.shape.width/2){this.rightMoveFlag = true;}
        }
    }

//Boxの種類を変更。RightBoxとLeftはここで同時に変更している。
    protected changeBoxType(){

        this.boxType = Util.randomInt(0,2);

        switch(this.boxType){
            case BoxType.NORMAL:
                const nr = new RightBox(Game.width, -Game.height, 300, 50, MyBox.normalBoxColor);
                const nl = new LeftBox(0, -Game.height, 300, 50, MyBox.normalBoxColor);

                switch(Game.stageLevel){
                    case StageLevel.ONE:
                        nr.mySideSpeed = 1;
                    break;
                    case StageLevel.TWO:
                        nr.mySideSpeed = 1.5;
                    break;
                    case StageLevel.THREE:
                        nr.mySideSpeed = 2;
                    break;

                }

                nl.mySideSpeed = nr.mySideSpeed;

            break;

            case BoxType.BOLD:
                const br = new RightBox(Game.width, -Game.height, 300, 300, MyBox.boldBoxColor);
                const bl = new LeftBox(0, -Game.height, 300, 300, MyBox.boldBoxColor);

                switch(Game.stageLevel){
                    case StageLevel.ONE:
                        br.mySideSpeed = 0.5;
                    break;
                    case StageLevel.TWO:
                        br.mySideSpeed = 1;
                    break;
                    case StageLevel.THREE:
                        br.mySideSpeed = 1.5;
                    break;

                }

                bl.mySideSpeed = br.mySideSpeed;

            break;
            case BoxType.FAST:
                const fr = new RightBox(Game.width, -Game.height, 300, 30, MyBox.fastBoxColor);
                const fl = new LeftBox(0, -Game.height, 300, 30, MyBox.fastBoxColor);

                switch(Game.stageLevel){
                    case StageLevel.ONE:
                        fr.mySideSpeed = 2;
                    break;
                    case StageLevel.TWO:
                        fr.mySideSpeed = 2.5;
                    break;
                    case StageLevel.THREE:
                        fr.mySideSpeed = 3;
                    break;

                }

                fl.mySideSpeed = fr.mySideSpeed;

            break;
        }
    }


    updateContent(){
        if(Game.gameOverFlag == false){
            this.updateBodyShape();
            this.sideMove();

            if(this.shape.y > 2 * Game.height){
                this.changeBoxType();
            }
        }
    }    
    
    
}

class LeftBox extends MyBox{
    constructor(x : number, y : number, width : number, height : number, color:number){
        super(x,y, width, height, color);

    }

    protected sideMove(){
        if(this.rightMoveFlag === true){
            this.shape.x += MyBox.sideMoveSpeed* this.mySideSpeed;
            this.body.position[0] += MyBox.sideMoveSpeed* this.mySideSpeed;
            if(this.shape.x >= Game.width/2 - this.shape.width/2){this.rightMoveFlag = false;}
        }
        else if(this.rightMoveFlag === false){
            this.shape.x -= MyBox.sideMoveSpeed* this.mySideSpeed;
            this.body.position[0] -= MyBox.sideMoveSpeed* this.mySideSpeed;
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