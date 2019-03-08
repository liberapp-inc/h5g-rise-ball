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
        //static I:PhysicsBall = null;   // singleton instance
        _this.radius = null;
        //PhysicsBall.I = this;
        _this.radius = radius;
        _this.setBody(x, y, radius);
        _this.setShape(x, y, radius);
        return _this;
    }
    PhysicsBall.prototype.setBody = function (x, y, radius) {
        this.body = new p2.Body({ mass: 1, position: [x, y] });
        this.bodyShape = new p2.Circle({
            radius: radius, fixedRotation: true, collisionGroup: GraphicShape.CIECLE, collisionMask: GraphicShape.BOX | GraphicShape.LINE | GraphicShape.DEAD_LINE
        });
        this.body.addShape(this.bodyShape);
        CreateWorld.world.addBody(this.body);
    };
    PhysicsBall.prototype.setShape = function (x, y, radius) {
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
    PhysicsBall.prototype.updateDrowShape = function (x, y, radius) {
        this.shape.x = x;
        this.shape.y = y;
        GameObject.display.addChild(this.shape);
    };
    return PhysicsBall;
}(PhysicsObject));
__reflect(PhysicsBall.prototype, "PhysicsBall");
var MyBall = (function (_super) {
    __extends(MyBall, _super);
    function MyBall(x, y, radius) {
        var _this = _super.call(this, x, y, radius) || this;
        MyBall.I = _this;
        //removedEventListenerしてもremoveされずに重複することがあるので、hasEventでEventがないときのみ実行
        if (GameObject.display.hasEventListener(egret.TouchEvent.TOUCH_BEGIN) == false)
            GameObject.display.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (e) { return MyBall.touch(e); }, false);
        return _this;
    }
    MyBall.touch = function (evt) {
        if (Game.gameOverFlag == false) {
            MyBall.I.body.applyForceLocal([0, -5000], [0, 0]);
        }
    };
    MyBall.prototype.updateContent = function () {
        this.updateDrowShape(this.body.position[0], this.body.position[1], this.radius);
    };
    MyBall.prototype.collisionEvent = function () { };
    MyBall.I = null;
    return MyBall;
}(PhysicsBall));
__reflect(MyBall.prototype, "MyBall");
//# sourceMappingURL=Ball.js.map