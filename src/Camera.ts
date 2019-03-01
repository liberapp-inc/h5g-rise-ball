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
/*        MainCamera.display.anchorOffsetX = PhysicsBall.I.shape.anchorOffsetX;
        MainCamera.display.anchorOffsetY = PhysicsBall.I.shape.anchorOffsetY;
        MainCamera.display.x = PhysicsBall.I.shape.x;
        MainCamera.display.y = PhysicsBall.I.shape.y;*/
    }

}