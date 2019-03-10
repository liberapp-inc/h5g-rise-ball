abstract class PhysicsLine extends PhysicsObject{
    protected length :number;
    protected angle :number;
    protected x : number;
    protected y : number;
    protected lineColor : number;
    
    constructor(x : number, y : number, length : number, angle : number, lineColor:number) {
        super();
        this.x = x;
        this.y = y;
        this.length = length ;
        this.angle =angle;
        this.lineColor = lineColor;
        this.setBody(x,y, length, angle);
        this.setShape(this.length, this.angle);


    }

    private setBody(x : number, y : number, length : number, angle : number){

        this.body = new p2.Body({mass : 1, position:[x,y], type:p2.Body.STATIC});
        this.bodyShape = new p2.Line({
            length : length
        });
        //なぜか上のbodyShapeの中にまとめて記述するとエラーがでたのでここに記載。
        this.bodyShape.angle = angle;
        this.bodyShape.collisionGroup = GraphicShape.LINE;
        this.bodyShape.collisionMask = GraphicShape.CIECLE;
        this.bodyShape.sensor = true;


        this.body.addShape(this.bodyShape);
        CreateWorld.world.addBody(this.body);
        
    }

    setShape(length: number, angle : number){
        if( this.shape ){
            GameObject.display.removeChild(this.shape);        
        }

        this.shape = new egret.Shape();
        this.shape.anchorOffsetX =0;
        this.shape.y = this.body.position[1];
        this.shape.graphics.lineStyle(3, this.lineColor);
        this.shape.graphics.moveTo(0, 0);
        this.shape.graphics.lineTo(Game.width, 0);       
        GameObject.display.addChild(this.shape);
        
    }

    protected updateDrowShape(x: number, y:number){
        this.shape.x = x;
        this.shape.y = y;
        GameObject.display.addChild(this.shape);
    }


}

class ScoreLine extends PhysicsLine {

    public collisionFlag:boolean = false;

    constructor(x : number, y : number, length : number, angle : number, color:number){
        super(x, y, length, angle, color);
    }

    setShape(length: number, angle : number){
        if( this.shape ){
            MoveDisplay.display.removeChild(this.shape);        
        }

        this.shape = new egret.Shape();
        this.shape.anchorOffsetX =0;
        this.shape.y = this.body.position[1];
        this.shape.graphics.lineStyle(3, this.lineColor);
        
        this.shape.graphics.moveTo(Game.width,0);
        this.shape.graphics.lineTo(0, 0);
        MoveDisplay.display.addChild(this.shape);
        
    }

    //MoveDisplayが移動したとき、shapeは移動するが、bodyは移動しないのでその補正
    protected updateBodyShape(){
        this.body.position[0] += MoveDisplay.moveSpeed[0];
        this.body.position[1] += MoveDisplay.moveSpeed[1];
        //this.shape.x = this.body.position[0];
        this.shape.y = this.body.position[1];
        MoveDisplay.display.addChild(this.shape);

        if(this.shape.y  > 2 *Game.height){
            this.body.position[1] -= Game.height*3;
            
            if(this.bodyShape.collisionMask == null){
                this.bodyShape.collisionMask = GraphicShape.CIECLE;
            }
        }

    }
    
    addDestroyMethod(){
        if( this.shape ){
            MoveDisplay.display.removeChild(this.shape);
            this.shape = null;
        }

    }

    updateContent(){
        if(Game.gameOverFlag == false){
            this.updateBodyShape();
        }
       
    }
    collisionEvent(){}
    
}