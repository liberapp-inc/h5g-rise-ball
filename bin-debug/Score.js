var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var Score = (function (_super) {
    __extends(Score, _super);
    function Score() {
        var _this = _super.call(this) || this;
        _this.score = 0;
        _this.bestScore = 0;
        _this.text = null;
        _this.textBest = null;
        Score.I = _this;
        _this.score = 0;
        _this.text = Util.myText(0, 0, "SCORE : 0", 100, 0.5, 0x0080ff, true);
        GameObject.display.addChild(_this.text);
        var bestScore = egret.localStorage.getItem("bestScore"); // string
        if (bestScore == null) {
            bestScore = "0";
            egret.localStorage.setItem("bestScore", bestScore);
        }
        _this.bestScore = parseInt(bestScore);
        _this.textBest = Util.myText(0, 50, "BEST : " + bestScore, 100, 0.5, 0x0080ff, true);
        GameObject.display.addChild(_this.textBest);
        return _this;
    }
    Score.prototype.onDestroy = function () {
        GameObject.display.removeChild(this.text);
        this.text = null;
        GameObject.display.removeChild(this.textBest);
        this.textBest = null;
    };
    Score.prototype.updateContent = function () {
        this.text.text = "SCORE : " + this.score.toFixed();
        if (this.bestScore < this.score) {
            this.bestScore = this.score;
            this.textBest.text = "BEST : " + this.score.toFixed();
        }
    };
    Score.prototype.addScore = function () {
        this.score += 1;
    };
    Score.I = null; // singleton instance
    return Score;
}(GameObject));
__reflect(Score.prototype, "Score");
//# sourceMappingURL=Score.js.map