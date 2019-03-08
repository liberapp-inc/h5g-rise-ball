class MainCamera extends GameObject{
    
    static I : MainCamera =null;

    public static display: egret.DisplayObjectContainer;
    
    constructor(){
        super();
        MainCamera.I = this;
        MainCamera.display = new egret.DisplayObjectContainer();
        GameObject.display.addChild(MainCamera.display);
        
    }

    static initial(displayObjectContainer: egret.DisplayObjectContainer){
        MainCamera.display = displayObjectContainer;
    }

    updateContent(){

    }

}

class MoveDisplay extends GameObject{
    
    static I : MainCamera =null;
    static moveSpeed :number[] = [];

    public static display: egret.DisplayObjectContainer;
    
    constructor(){
        super();
        MoveDisplay.I = this;
        MoveDisplay.display = new egret.DisplayObjectContainer();
        GameObject.display.addChild(MoveDisplay.display);
        MoveDisplay.moveSpeed[0]= 0;
        MoveDisplay.moveSpeed[1]= 2;       
        
    }

    static initial(displayObjectContainer: egret.DisplayObjectContainer){
        MoveDisplay.display = displayObjectContainer;
    }

    static move(x :number, y:number){
        MoveDisplay.display.x += x;
        MoveDisplay.display.y += y;

        if(MoveDisplay.display.y > Game.height){
            MoveDisplay.display.y = -1;
        }
        
    }

    updateContent(){
        if(Game.gameOverFlag == false){
            MoveDisplay.move(MoveDisplay.moveSpeed[0], MoveDisplay.moveSpeed[1]);

        }
    }

}