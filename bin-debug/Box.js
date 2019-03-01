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
var Box = (function (_super) {
    __extends(Box, _super);
    function Box(x, y, width, height, color) {
        var _this = _super.call(this) || this;
        _this.setShape(x, y, width, height, color);
        return _this;
    }
    Box.prototype.setShape = function (x, y, width, height, color) {
        if (this.shape) {
            GameObject.display.removeChild(this.shape);
        }
        this.shape = new egret.Shape();
        this.shape.x = x;
        this.shape.y = y;
        this.shape.graphics.beginFill(color);
        this.shape.graphics.drawRect(0, 0, width, height);
        this.shape.graphics.endFill();
        GameObject.display.addChild(this.shape);
    };
    Box.prototype.updateContent = function () { };
    ;
    return Box;
}(GameObject));
__reflect(Box.prototype, "Box");
var PhysicsBox = (function (_super) {
    __extends(PhysicsBox, _super);
    function PhysicsBox(x, y, width, height, color) {
        var _this = _super.call(this) || this;
        _this.boxPositionX = x;
        _this.boxPositionY = y;
        _this.boxWidth = width;
        _this.boxHeight = height;
        _this.boxColor = color;
        _this.setBody(x, y, width, height);
        _this.setShape(_this.boxWidth, _this.boxHeight);
        return _this;
    }
    PhysicsBox.prototype.setBody = function (x, y, width, height) {
        this.body = new p2.Body({ mass: 1, position: [x, y], type: p2.Body.STATIC });
        this.bodyShape = new p2.Box({
            width: width, height: height, fixedRotation: true,
        });
        this.body.addShape(this.bodyShape);
        CreateWorld.world.addBody(this.body);
    };
    PhysicsBox.prototype.setShape = function (width, height) {
        if (this.shape) {
            GameObject.display.removeChild(this.shape);
        }
        this.shape = new egret.Shape();
        this.shape.anchorOffsetX += width / 2;
        this.shape.anchorOffsetY += height / 2;
        this.shape.x = this.body.position[0];
        this.shape.y = this.body.position[1];
        this.shape.graphics.beginFill(this.boxColor);
        this.shape.graphics.drawRect(0, 0, width, height);
        this.shape.graphics.endFill();
        GameObject.display.addChild(this.shape);
    };
    PhysicsBox.prototype.updateContent = function () { };
    PhysicsBox.prototype.collisionEvent = function () { };
    PhysicsBox.boxMove = false;
    PhysicsBox.blockdownSpeed = 3;
    return PhysicsBox;
}(PhysicsObject));
__reflect(PhysicsBox.prototype, "PhysicsBox");
var MyBox = (function (_super) {
    __extends(MyBox, _super);
    function MyBox(x, y, width, height, color) {
        return _super.call(this, x, y, width, height, color) || this;
    }
    return MyBox;
}(Box));
__reflect(MyBox.prototype, "MyBox");
//# sourceMappingURL=Box.js.map