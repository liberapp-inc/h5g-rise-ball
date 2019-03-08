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
var PhysicsLine = (function (_super) {
    __extends(PhysicsLine, _super);
    function PhysicsLine(x, y, length, angle, lineColor) {
        var _this = _super.call(this) || this;
        _this.x = x;
        _this.y = y;
        _this.length = length;
        _this.angle = angle;
        _this.lineColor = lineColor;
        _this.setBody(x, y, length, angle);
        _this.setShape(_this.length, _this.angle);
        return _this;
    }
    PhysicsLine.prototype.setBody = function (x, y, length, angle) {
        this.body = new p2.Body({ mass: 1, position: [x, y], type: p2.Body.STATIC });
        this.bodyShape = new p2.Line({
            length: length
        });
        //なぜか上のbodyShapeの中にまとめて記述するとエラーがでたのでここに記載。
        this.bodyShape.angle = angle;
        this.bodyShape.collisionGroup = GraphicShape.LINE;
        this.bodyShape.collisionMask = GraphicShape.CIECLE;
        this.bodyShape.sensor = true;
        this.body.addShape(this.bodyShape);
        CreateWorld.world.addBody(this.body);
    };
    PhysicsLine.prototype.setShape = function (length, angle) {
        if (this.shape) {
            GameObject.display.removeChild(this.shape);
        }
        this.shape = new egret.Shape();
        this.shape.anchorOffsetX = 0;
        this.shape.y = this.body.position[1];
        this.shape.graphics.lineStyle(3, this.lineColor);
        this.shape.graphics.moveTo(0, 0);
        this.shape.graphics.lineTo(Game.width, 0);
        GameObject.display.addChild(this.shape);
    };
    PhysicsLine.prototype.updateDrowShape = function (x, y) {
        this.shape.x = x;
        this.shape.y = y;
        GameObject.display.addChild(this.shape);
    };
    return PhysicsLine;
}(PhysicsObject));
__reflect(PhysicsLine.prototype, "PhysicsLine");
var ScoreLine = (function (_super) {
    __extends(ScoreLine, _super);
    function ScoreLine(x, y, length, angle, color) {
        return _super.call(this, x, y, length, angle, color) || this;
    }
    ScoreLine.prototype.setShape = function (length, angle) {
        if (this.shape) {
            MoveDisplay.display.removeChild(this.shape);
        }
        this.shape = new egret.Shape();
        this.shape.anchorOffsetX = 0;
        this.shape.y = this.body.position[1];
        this.shape.graphics.lineStyle(3, this.lineColor);
        this.shape.graphics.moveTo(Game.width, 0);
        this.shape.graphics.lineTo(0, 0);
        MoveDisplay.display.addChild(this.shape);
    };
    //MoveDisplayが移動したとき、shapeは移動するが、bodyは移動しないのでその補正
    ScoreLine.prototype.updateBodyShape = function () {
        this.body.position[0] += MoveDisplay.moveSpeed[0];
        this.body.position[1] += MoveDisplay.moveSpeed[1];
        if (MoveDisplay.display.y == -1) {
            this.body.position[1] -= Game.height;
        }
    };
    ScoreLine.prototype.addDestroyMethod = function () {
        if (this.shape) {
            MoveDisplay.display.removeChild(this.shape);
            this.shape = null;
        }
    };
    ScoreLine.prototype.updateContent = function () {
        this.updateBodyShape();
    };
    ScoreLine.prototype.collisionEvent = function () { };
    return ScoreLine;
}(PhysicsLine));
__reflect(ScoreLine.prototype, "ScoreLine");
//# sourceMappingURL=Line.js.map