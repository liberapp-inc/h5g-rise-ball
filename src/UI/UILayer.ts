//UIコンポーネントを描画するレイヤー
//リトライするときはaddDestroyMethodをGameOverで実行すること
class UILayer{

    static I :UILayer = null;
    static display: eui.UILayer = null;
    static index :number;
    static onTouch :boolean = false;

    constructor(){
        UILayer.I = this;
        this.setContainer();
        UILayer.index = GameObject.display.getChildIndex(UILayer.display) ;
        UILayer.display.once( egret.TouchEvent.TOUCH_BEGIN, this.deleteDiscription, this );
        UILayer.display.addEventListener( egret.TouchEvent.TOUCH_BEGIN, this.push, this );
        UILayer.display.addEventListener( egret.TouchEvent.TOUCH_END, this.end, this );
    }

    setContainer(){
        UILayer.display = new eui.UILayer();
        GameObject.display.addChild(UILayer.display);
    }

    push(e : egret.TouchEvent){
        UILayer.onTouch = true;
        Player.I.jump();
    }

    end(){
        UILayer.onTouch = false;

    }

    deleteDiscription(){
        Description.I.destroy();
    }

    remove(){
        if(UILayer.display){
            UILayer.display.removeEventListener( egret.TouchEvent.TOUCH_BEGIN, this.push, this );
            UILayer.display.removeEventListener( egret.TouchEvent.TOUCH_END, this.end, this );
            UILayer.display.removeChildren();
            GameObject.display.removeChild(UILayer.display);
            UILayer.display =null;
        }
    }



}

