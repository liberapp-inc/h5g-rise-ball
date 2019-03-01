class GameOver extends GameObject{

    textGameOver:egret.TextField = null;
    textScore:egret.TextField = null;

    constructor() {
        super();

        this.textGameOver = Utility.myText(0, 0, "GAME OVER", 100, 0.5, 0x0080ff, true);
        GameObject.display.addChild( this.textGameOver );
        
        this.textScore = Utility.myText(0, 0, "GAME OVER", 100, 0.5, 0x0080ff, true);
        GameObject.display.addChild( this.textScore );

        GameObject.display.once(egret.TouchEvent.TOUCH_TAP, (e: egret.TouchEvent) => this.tap(e), this);
    }

    onDestroy() {
        GameObject.display.removeChild( this.textGameOver );
        this.textGameOver = null;
        GameObject.display.removeChild( this.textScore );
        this.textScore = null;
    }
    
    updateContent() { }

    tap(e:egret.TouchEvent){
        GameObject.transit = Game.init;
        this.destroy();
    }
}