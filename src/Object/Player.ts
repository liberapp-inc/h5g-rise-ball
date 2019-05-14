class Player extends PhysicsObject{

    static I : Player = null;
    private maxBallPosY : number = 0;
    private ballPosY : number;
    private start : boolean = false;
    private clockwise : boolean = false;

    constructor(x:number, y:number,diameter:number) {
        super(x,y,diameter,diameter);
        Player.I = this;
        this.ballPosY = Game.height* 0.60;
        this.maxBallPosY = this.ballPosY;
        this.setBody(x, y, diameter/2);
        this.setShape(0,0,diameter/2,ColorPallet.RED);
        PhysicsObject.world.on("beginContact", this.collision, this);

    }

    private setShape(x:number, y:number,radius:number,color:number){
        const shape : egret.Shape = Util.setCircle(x,y,radius,color,true);
        this.compornent.addChild(shape);
        this.shapes.push(shape);
    }

    private setBody(x: number, y:number, radius: number){

        this.body = new p2.Body({
            mass : 1, 
            position:[x,y],
        });
        this.bodyShape = new p2.Circle({
            radius : radius, 
            fixedRotation:true,
            collisionGroup: GraphicShape.CIECLE, 
            collisionMask:GraphicShape.WALL | GraphicShape.LINE| GraphicShape.BLOCK
        });
        this.body.addShape(this.bodyShape);
        PhysicsObject.world.addBody(this.body);
        
    }


    private setLine(x : number, y : number, length : number, degree : number, lineWidth:number, color:number ){
        const shape : egret.Shape = Util.setLine(x,y,length,degree,lineWidth,color);
        this.compornent.addChild(shape);
        this.shapes.push(shape);
    }


    collision(evt){
        const bodyA: p2.Body = evt.bodyA;
        const shapeA  = evt.shapeA;
        const bodyB: p2.Body = evt.bodyB;
        const shapeB  = evt.shapeB;
        
        if(shapeA.collisionGroup == GraphicShape.BLOCK || shapeB.collisionGroup == GraphicShape.BLOCK){
            new GameOver(0,0,0,0);
            return;
        }
        
        if(shapeA.collisionGroup == GraphicShape.LINE || shapeB.collisionGroup == GraphicShape.LINE){
            CreateGameScene.scoreLine.forEach(s =>{
                if(s.body == bodyA && !s.getHit()){
                    s.setHit(true);
                    Score.addScore();
                    CreateGameScene.freshArray();
                    return;
                }
                else if(s.body == bodyB && !s.getHit()){
                    s.setHit(true);
                    Score.addScore();
                    CreateGameScene.freshArray();
                    return;
                }
            });
        }
               
 
    }

     fixedUpdate(){
        this.updateDrowShape();
        if(this.maxBallPosY > this.compornent.y){
            this.maxBallPosY = this.compornent.y;
            Camera2D.y = this.ballPosY - this.compornent.y;
            Camera2D.transform( GameStage.display );
        }
        this.checkGameOver();
    }

    checkGameOver(){
        if(this.maxBallPosY - this.compornent.y < -Game.height*0.44 && GameOver.gameOverFlag == false){
            new GameOver(0,0,0,0);
        }
    }


    jump(){
        const power : number = 6000;
        this.body.applyForceLocal([0, -power],[0,0]);

    }


}


