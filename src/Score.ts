class Score extends GameObject{

    static I:Score = null;   // singleton instance

    score:number = 0;

    bestScore:number = 0;
    text:egret.TextField = null;
    textBest:egret.TextField = null;

    textColor : number = 0x00FF3B;

    constructor() {
        super();

        Score.I = this;
        this.score = 0;
        this.text = Util.myText(0, 0, "SCORE : 0", 100, 0.5, this.textColor, true);
        GameObject.display.addChild( this.text );

        let bestScore = window.localStorage.getItem("bestScore_ThroughTheGate"); // string
        if( bestScore == null ){
            bestScore = "0";
            window.localStorage.setItem("bestScore_ThroughTheGate", bestScore);
        }
        this.bestScore = parseInt( bestScore );
        this.textBest = Util.myText(0, 50, "BEST : " + bestScore, 100, 0.5, this.textColor, true);
        GameObject.display.addChild( this.textBest );
    }
    
    onDestroy() {
        GameObject.display.removeChild( this.text );
        this.text = null;
        GameObject.display.removeChild( this.textBest );
        this.textBest = null;
    }

    updateContent() {
        this.text.text = "SCORE : " + this.score.toFixed();
        if( this.bestScore < this.score ){
            this.bestScore = this.score;
            this.textBest.text = "BEST : " + this.score.toFixed();
        }
    }

    addScore(){
        this.score += 1;
        
    }


}