class Box extends GameObject{
    
    constructor(boxPositionX : number, boxPositionY : number, boxWidth : number, boxHeight : number, boxColor:number) {
        super();
        this.setShape(boxWidth, boxHeight, boxWidth, boxHeight, boxColor);


    }

    setShape(boxPositionX : number, boxPositionY : number, boxWidth : number, boxHeight : number, boxColor:number){
        if( this.shape ){
            GameObject.display.removeChild(this.shape);        
        }

        this.shape = new egret.Shape();
        this.shape.x = boxPositionX;
        this.shape.y = boxPositionY;
        this.shape.graphics.beginFill(boxColor);
        this.shape.graphics.drawRect(0, 0, boxWidth , boxHeight);
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
    
    constructor(boxPositionX : number, boxPositionY : number, boxWidth : number, boxHeight : number, boxColor:number) {
        super();
        this.boxPositionX = boxPositionX;
        this.boxPositionY = boxPositionY;
        this.boxWidth = boxWidth ;
        this.boxHeight =boxHeight;
        this.boxColor = boxColor;
        this.setShape(this.boxWidth, this.boxHeight);


    }



    setShape(width: number, height : number){
        if( this.shape ){
            GameObject.display.removeChild(this.shape);        
        }

        this.shape = new egret.Shape();
        this.shape.anchorOffsetX += width/2;
        this.shape.anchorOffsetY += height/2;
        this.shape.graphics.beginFill(this.boxColor);
        this.shape.graphics.drawRect(0, 0, width , height);
        this.shape.graphics.endFill();
        GameObject.display.addChild(this.shape);
        
    }

    updateContent(){}
    collisionEvent(){}

}
