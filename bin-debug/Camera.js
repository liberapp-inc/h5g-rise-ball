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
    };
    MainCamera.I = null;
    return MainCamera;
}(GameObject));
__reflect(MainCamera.prototype, "MainCamera");
var MoveDisplay = (function (_super) {
    __extends(MoveDisplay, _super);
    function MoveDisplay() {
        var _this = _super.call(this) || this;
        MoveDisplay.I = _this;
        MoveDisplay.display = new egret.DisplayObjectContainer();
        GameObject.display.addChild(MoveDisplay.display);
        MoveDisplay.moveSpeed[0] = 0;
        MoveDisplay.moveSpeed[1] = 2;
        return _this;
    }
    MoveDisplay.initial = function (displayObjectContainer) {
        MoveDisplay.display = displayObjectContainer;
    };
    MoveDisplay.move = function (x, y) {
        MoveDisplay.display.x += x;
        MoveDisplay.display.y += y;
        if (MoveDisplay.display.y > Game.height) {
            MoveDisplay.display.y = -1;
        }
    };
    MoveDisplay.prototype.updateContent = function () {
        if (Game.gameOverFlag == false) {
            MoveDisplay.move(MoveDisplay.moveSpeed[0], MoveDisplay.moveSpeed[1]);
        }
    };
    MoveDisplay.I = null;
    MoveDisplay.moveSpeed = [];
    return MoveDisplay;
}(GameObject));
__reflect(MoveDisplay.prototype, "MoveDisplay");
//# sourceMappingURL=Camera.js.map