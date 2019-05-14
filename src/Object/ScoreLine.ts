class ScoreLine extends PhysicsObject{

    private hit : boolean = false;

    constructor(x : number, y : number, length:number, degree : number, lineWidth:number, lineColor :number) {
        super(x,y,length,lineWidth);
        this.setBody(x, y,length,lineWidth);
        this.setShape(0,0,length,degree,lineWidth,lineColor);
        CreateGameScene.scoreLine.push(this);
        
    }

    setShape(x: number, y:number, length:number, degree : number, lineWidth:number,color:number){

        const shape:egret.Shape = Util.setLine(x,y,length,degree,lineWidth,color);
        this.compornent.addChild(shape);
        this.shapes.push(shape);

    }

    setBody(x: number, y:number, width:number, height:number){

        this.body = new p2.Body({mass : 1, position:[x,y], type:p2.Body.STATIC});
        this.bodyShape = new p2.Plane({
            sensor:true,
            collisionGroup: GraphicShape.LINE,
            collisionMask:GraphicShape.CIECLE
        });
        this.body.angle =  0;
        this.body.addShape(this.bodyShape);
        PhysicsObject.world.addBody(this.body);
        
    }


    fixedUpdate(){
        if(this.compornent.y > Player.I.compornent.y + Game.height){
            this.destroy();
            return;
        }
    }

    public getHit():boolean{
        return this.hit;
    }

    public setHit(value : boolean){
        this.hit = value;
    }
}