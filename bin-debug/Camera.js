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
var MainCamera = (function (_super) {
    __extends(MainCamera, _super);
    function MainCamera() {
        var _this = _super.call(this) || this;
        MainCamera.I = _this;
        MainCamera.display = new egret.DisplayObjectContainer();
        GameObject.display.addChild(MainCamera.display);
        return _this;
    }
    MainCamera.initial = function (displayObjectContainer) {
        MainCamera.display = displayObjectContainer;
    };
    MainCamera.prototype.updateContent = function () {
        /*        MainCamera.display.anchorOffsetX = PhysicsBall.I.shape.anchorOffsetX;
                MainCamera.display.anchorOffsetY = PhysicsBall.I.shape.anchorOffsetY;
                MainCamera.display.x = PhysicsBall.I.shape.x;
                MainCamera.display.y = PhysicsBall.I.shape.y;*/
    };
    MainCamera.I = null;
    return MainCamera;
}(GameObject));
__reflect(MainCamera.prototype, "MainCamera");
//# sourceMappingURL=Camera.js.map