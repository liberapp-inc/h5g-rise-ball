class GameOver extends GameObject{

    textGameOver:egret.TextField = null;
    textScore:egret.TextField = null;

    constructor() {
        super();

        this.textGameOver = Util.myText(Game.width/2, Game.height/2 - 50, "GAME OVER", 100, 0.5, 0x0080ff, true);
        this.textGameOver.anchorOffsetX = this.textGameOver.width/2;
        this.textGameOver.anchorOffsetY = this.textGameOver.height/2;
        GameObject.display.addChild( this.textGameOver );
        
        this.textScore = Util.myText(Game.width/2, Game.height/2 + 50, "SCORE : " + Score.I.score, 100, 0.5, 0x0080ff, true);
        this.textScore.anchorOffsetX = this.textScore.width/2;
        this.textScore.anchorOffsetY = this.textScore.height/2;
        GameObject.display.addChild( this.textScore );

        GameObject.display.once(egret.TouchEvent.TOUCH_TAP, (e: egret.TouchEvent) => this.tap(e), this);
    }

    onDestroy() {
        GameObject.display.removeChild( this.textGameOver );
        this.textGameOver = null;
        GameObject.display.removeChild( this.textScore );
        this.textScore = null;
    }
    
    updateContent() {
        GameObject.display.addChild( this.textGameOver );
        GameObject.display.addChild( this.textScore );

     }

    tap(e:egret.TouchEvent){
        GameObject.display.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, (e: egret.TouchEvent) => MyBall.touch(e), false);

        GameObject.transit = Game.init;
        this.destroy();
    }
}