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
var ScoreLine = (function (_super) {
    __extends(ScoreLine, _super);
    function ScoreLine(x, y, length, degree, lineWidth, lineColor) {
        var _this = _super.call(this, x, y, length, lineWidth) || this;
        _this.hit = false;
        _this.setBody(x, y, length, lineWidth);
        _this.setShape(0, 0, length, degree, lineWidth, lineColor);
        CreateGameScene.scoreLine.push(_this);
        return _this;
    }
    ScoreLine.prototype.setShape = function (x, y, length, degree, lineWidth, color) {
        var shape = Util.setLine(x, y, length, degree, lineWidth, color);
        this.compornent.addChild(shape);
        this.shapes.push(shape);
    };
    ScoreLine.prototype.setBody = function (x, y, width, height) {
        this.body = new p2.Body({ mass: 1, position: [x, y], type: p2.Body.STATIC });
        this.bodyShape = new p2.Plane({
            sensor: true,
            collisionGroup: GraphicShape.LINE,
            collisionMask: GraphicShape.CIECLE
        });
        this.body.angle = 0;
        this.body.addShape(this.bodyShape);
        PhysicsObject.world.addBody(this.body);
    };
    ScoreLine.prototype.fixedUpdate = function () {
        if (this.compornent.y > Player.I.compornent.y + Game.height) {
            this.destroy();
            return;
        }
    };
    ScoreLine.prototype.getHit = function () {
        return this.hit;
    };
    ScoreLine.prototype.setHit = function (value) {
        this.hit = value;
    };
    return ScoreLine;
}(PhysicsObject));
__reflect(ScoreLine.prototype, "ScoreLine");
//# sourceMappingURL=ScoreLine.js.map