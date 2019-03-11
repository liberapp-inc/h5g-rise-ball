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
var GameOver = (function (_super) {
    __extends(GameOver, _super);
    function GameOver() {
        var _this = _super.call(this) || this;
        _this.textGameOver = null;
        _this.textScore = null;
        _this.textGameOver = Util.myText(Game.width / 2, Game.height / 2 - 50, "GAME OVER", 100, 0.5, 0x0080ff, true);
        _this.textGameOver.anchorOffsetX = _this.textGameOver.width / 2;
        _this.textGameOver.anchorOffsetY = _this.textGameOver.height / 2;
        GameObject.display.addChild(_this.textGameOver);
        _this.textScore = Util.myText(Game.width / 2, Game.height / 2 + 50, "SCORE : " + Score.I.score, 100, 0.5, 0x0080ff, true);
        _this.textScore.anchorOffsetX = _this.textScore.width / 2;
        _this.textScore.anchorOffsetY = _this.textScore.height / 2;
        GameObject.display.addChild(_this.textScore);
        GameObject.display.once(egret.TouchEvent.TOUCH_TAP, function (e) { return _this.tap(e); }, _this);
        return _this;
    }
    GameOver.prototype.onDestroy = function () {
        GameObject.display.removeChild(this.textGameOver);
        this.textGameOver = null;
        GameObject.display.removeChild(this.textScore);
        this.textScore = null;
    };
    GameOver.prototype.updateContent = function () {
        GameObject.display.addChild(this.textGameOver);
        GameObject.display.addChild(this.textScore);
    };
    GameOver.prototype.tap = function (e) {
        GameObject.display.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, function (e) { return MyBall.touch(e); }, false);
        GameObject.transit = Game.init;
        this.destroy();
    };
    return GameOver;
}(GameObject));
__reflect(GameOver.prototype, "GameOver");
//# sourceMappingURL=GameOver.js.map