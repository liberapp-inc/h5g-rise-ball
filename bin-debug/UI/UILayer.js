var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
//UIコンポーネントを描画するレイヤー
//リトライするときはaddDestroyMethodをGameOverで実行すること
var UILayer = (function () {
    function UILayer() {
        UILayer.I = this;
        this.setContainer();
        UILayer.index = GameObject.display.getChildIndex(UILayer.display);
        UILayer.display.once(egret.TouchEvent.TOUCH_BEGIN, this.deleteDiscription, this);
        UILayer.display.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.push, this);
        UILayer.display.addEventListener(egret.TouchEvent.TOUCH_END, this.end, this);
    }
    UILayer.prototype.setContainer = function () {
        UILayer.display = new eui.UILayer();
        GameObject.display.addChild(UILayer.display);
    };
    UILayer.prototype.push = function (e) {
        UILayer.onTouch = true;
        Player.I.jump();
    };
    UILayer.prototype.end = function () {
        UILayer.onTouch = false;
    };
    UILayer.prototype.deleteDiscription = function () {
        Description.I.destroy();
    };
    UILayer.prototype.remove = function () {
        if (UILayer.display) {
            UILayer.display.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.push, this);
            UILayer.display.removeEventListener(egret.TouchEvent.TOUCH_END, this.end, this);
            UILayer.display.removeChildren();
            GameObject.display.removeChild(UILayer.display);
            UILayer.display = null;
        }
    };
    UILayer.I = null;
    UILayer.display = null;
    UILayer.onTouch = false;
    return UILayer;
}());
__reflect(UILayer.prototype, "UILayer");
//# sourceMappingURL=UILayer.js.map