class Ground extends PhysicsObject{

    constructor(x : number, y : number, length:number, degree : number, lineWidth:number, lineColor :number) {
        super(x,y,length,lineWidth);
        this.setBody(x, y,length,lineWidth);
        this.setShape(0,0,length,degree,lineWidth,lineColor);
        
    }

    setShape(x: number, y:number, length:number, degree : number, lineWidth:number,color:number){

        const shape:egret.Shape = Util.setLine(x,y,length,degree,lineWidth,color);
        this.compornent.addChild(shape);
        this.shapes.push(shape);

    }

    setBody(x: number, y:number, width:number, height:number){

        this.body = new p2.Body({mass : 1, position:[x,y], type:p2.Body.STATIC});
        this.bodyShape = new p2.Plane({
            collisionGroup: GraphicShape.WALL,
            collisionMask:GraphicShape.CIECLE
        });
        this.body.angle =  Math.PI;
        this.body.addShape(this.bodyShape);
        PhysicsObject.world.addBody(this.body);
        
    }


    fixedUpdate(){
    }

}