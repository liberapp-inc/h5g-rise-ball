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
var BlockType;
(function (BlockType) {
    BlockType[BlockType["NOMAL"] = 0] = "NOMAL";
    BlockType[BlockType["BOLD"] = 1] = "BOLD";
    BlockType[BlockType["SPEED"] = 2] = "SPEED";
})(BlockType || (BlockType = {}));
var Block = (function (_super) {
    __extends(Block, _super);
    function Block(x, y, width, height, moveSpeed) {
        var _this = _super.call(this, x, y, width, height) || this;
        _this.moveSpeed = 0;
        _this.setBody(x, y, width, height);
        _this.setShape(0, 0, width, height, ColorPallet.BLUE);
        if (x < Game.width / 2) {
            _this.toRight = true;
            CreateGameScene.leftBlock.push(_this);
        }
        else {
            _this.toRight = false;
            CreateGameScene.rightBlock.push(_this);
        }
        _this.moveSpeed = moveSpeed;
        return _this;
    }
    Block.prototype.setBody = function (x, y, width, height) {
        this.body = new p2.Body({ mass: 1,
            position: [x, y],
            type: p2.Body.STATIC
        });
        this.bodyShape = new p2.Box({
            width: width, height: height,
            fixedRotation: true,
            collisionGroup: GraphicShape.BLOCK,
            collisionMask: GraphicShape.CIECLE,
        });
        this.body.addShape(this.bodyShape);
        PhysicsObject.world.addBody(this.body);
    };
    Block.prototype.setShape = function (x, y, width, height, color) {
        var shape = Util.setRect(x, y, width, height, color, 0, true);
        this.compornent.addChild(shape);
        this.shapes.push(shape);
        this.compornent.anchorOffsetX += width / 2;
        this.compornent.anchorOffsetY += height / 2;
    };
    Block.prototype.fixedUpdate = function () {
        if (this.compornent.y > Player.I.compornent.y + Game.height) {
            this.destroy();
            return;
        }
        this.updateDrowShape();
    };
    Block.prototype.getToRight = function () {
        return this.toRight;
    };
    Block.prototype.setToRight = function (value) {
        this.toRight = value;
    };
    Block.prototype.getMoveSpeed = function () {
        return this.moveSpeed;
    };
    Block.prototype.setMoveSpeed = function (value) {
        this.moveSpeed = value;
    };
    return Block;
}(PhysicsObject));
__reflect(Block.prototype, "Block");
//# sourceMappingURL=Block.js.map