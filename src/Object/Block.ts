enum BlockType{
    NOMAL,
    BOLD,
    SPEED,
}

class Block extends PhysicsObject{

    private toRight :boolean;
    private moveSpeed : number = 0;

    constructor(x : number, y:number, width:number, height:number, moveSpeed : number) {
        super(x, y, width,height);
        this.setBody(x,y,width,height);
        this.setShape(0, 0, width,height,ColorPallet.GREEN);
        if(x < Game.width/2){
            this.toRight = true;
            CreateGameScene.leftBlock.push(this);
        }
        else{
            this.toRight = false;
            CreateGameScene.rightBlock.push(this);
        }
        this.moveSpeed = moveSpeed;
    }


    private setBody(x : number, y : number, width : number, height : number){

        this.body = new p2.Body({mass : 1, 
            position:[x,y], 
            type:p2.Body.STATIC
        });
        this.bodyShape = new p2.Box({
            width : width, height: height, 
            fixedRotation:true, 
            collisionGroup: GraphicShape.BLOCK, 
            collisionMask:GraphicShape.CIECLE,
        });
        this.body.addShape(this.bodyShape);
        PhysicsObject.world.addBody(this.body);
        
    }

    setShape(x: number, y:number, width:number, height:number,color:number){

        const shape : egret.Shape = Util.setRect(x,y,width,height,color,0,true);
        this.compornent.addChild(shape);
        this.shapes.push(shape);
        this.compornent.anchorOffsetX += width/2;
        this.compornent.anchorOffsetY += height/2;
        

    }


    fixedUpdate(){
        if(this.compornent.y > Player.I.compornent.y + Game.height){
            this.destroy();
            return;
        }
        this.updateDrowShape();
    }

    public getToRight():boolean{
        return this.toRight;
    }

    public setToRight(value : boolean){
        this.toRight = value;
    }

    public getMoveSpeed():number{
        return this.moveSpeed;
    }

    public setMoveSpeed(value : number){
        this.moveSpeed = value;
    }
}
