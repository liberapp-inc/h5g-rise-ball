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
var Ball = (function (_super) {
    __extends(Ball, _super);
    function Ball(x, y, radius) {
        var _this = _super.call(this) || this;
        _this.radius = null;
        _this.setShape(x, y, radius);
        return _this;
    }
    Ball.prototype.setShape = function (x, y, radius) {
        if (this.shape) {
            GameObject.display.removeChild(this.shape);
        }
        this.shape = new egret.Shape();
        this.shape.x = x;
        this.shape.y = y;
        this.shape.graphics.beginFill(0xff0000);
        this.shape.graphics.drawCircle(0, 0, radius);
        this.shape.graphics.endFill();
        GameObject.display.addChild(this.shape);
    };
    /*    updateDrowShape(){
            this.shape.x = this.body.position[0];
            this.shape.y = this.body.position[1];
            GameObject.display.addChild(this.shape);
        }*/
    Ball.prototype.updateContent = function () {
    };
    Ball.I = null; // singleton instance
    return Ball;
}(GameObject));
__reflect(Ball.prototype, "Ball");
var PhysicsBall = (function (_super) {
    __extends(PhysicsBall, _super);
    function PhysicsBall(x, y, radius) {
        var _this = _super.call(this) || this;
        _this.radius = null;
        PhysicsBall.I = _this;
        _this.radius = radius;
        _this.setBody(x, y, radius);
        _this.setShape(x, y, radius);
        return _this;
    }
    PhysicsBall.prototype.setBody = function (x, y, radius) {
        this.body = new p2.Body({ mass: 1, position: [x, y] });
        this.bodyShape = new p2.Circle({
            radius: radius, fixedRotation: true
        });
        this.body.addShape(this.bodyShape);
        CreateWorld.world.addBody(this.body);
    };
    PhysicsBall.prototype.setShape = function (x, y, radius) {
        if (this.shape) {
            MainCamera.display.removeChild(this.shape);
        }
        this.shape = new egret.Shape();
        this.shape.x = x;
        this.shape.y = y;
        this.shape.graphics.beginFill(0xff0000);
        this.shape.graphics.drawCircle(0, 0, radius);
        this.shape.graphics.endFill();
        MainCamera.display.addChild(this.shape);
    };
    PhysicsBall.prototype.updateDrowShape = function (x, y, radius) {
        this.shape.x = x;
        this.shape.y = y;
        MainCamera.display.addChild(this.shape);
    };
    PhysicsBall.prototype.updateContent = function () {
        this.updateDrowShape(this.body.position[0], this.body.position[1], this.radius);
        console.log(this.shape.y);
    };
    PhysicsBall.prototype.collisionEvent = function () { };
    PhysicsBall.I = null; // singleton instance
    return PhysicsBall;
}(PhysicsObject));
__reflect(PhysicsBall.prototype, "PhysicsBall");
var MyBall = (function (_super) {
    __extends(MyBall, _super);
    function MyBall(x, y, radius) {
        var _this = _super.call(this, x, y, radius) || this;
        MyBall.I = _this;
        return _this;
    }
    MyBall.prototype.setShape = function (x, y, radius) {
        if (this.shape) {
            GameObject.display.removeChild(this.shape);
        }
        this.shape = new egret.Shape();
        this.shape.x = x;
        this.shape.y = y;
        this.shape.graphics.beginFill(0xff0000);
        this.shape.graphics.drawCircle(0, 0, radius);
        this.shape.graphics.endFill();
        MainCamera.display.addChild(this.shape);
    };
    MyBall.touch = function (evt) {
    };
    MyBall.prototype.updateContent = function () {
    };
    MyBall.I = null;
    return MyBall;
}(Ball));
__reflect(MyBall.prototype, "MyBall");
//# sourceMappingURL=Ball.js.map