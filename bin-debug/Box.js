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
    //static boxMove : boolean = false;
    //static blockdownSpeed : number = 3;
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
            width: width, height: height, fixedRotation: true, collisionGroup: GraphicShape.BOX, collisionMask: GraphicShape.CIECLE
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
    PhysicsBox.prototype.updateDrowShape = function (x, y) {
        this.shape.x = x;
        this.shape.y = y;
        GameObject.display.addChild(this.shape);
    };
    return PhysicsBox;
}(PhysicsObject));
__reflect(PhysicsBox.prototype, "PhysicsBox");
var MyBox = (function (_super) {
    __extends(MyBox, _super);
    function MyBox(x, y, width, height, color) {
        var _this = _super.call(this, x, y, width, height, color) || this;
        _this.rightMoveFlag = true;
        _this.moveDisplayPosX = MoveDisplay.display.x;
        _this.moveDisplayPosY = MoveDisplay.display.y;
        return _this;
    }
    //GameObjectのdisplayに子オブジェクトのMoveDisPlayにadd
    MyBox.prototype.setShape = function (width, height) {
        if (this.shape) {
            MoveDisplay.display.removeChild(this.shape);
        }
        this.shape = new egret.Shape();
        this.shape.anchorOffsetX += width / 2;
        this.shape.anchorOffsetY += height / 2;
        this.shape.x = this.body.position[0];
        this.shape.y = this.body.position[1];
        this.shape.graphics.beginFill(this.boxColor);
        this.shape.graphics.drawRect(0, 0, width, height);
        this.shape.graphics.endFill();
        MoveDisplay.display.addChild(this.shape);
    };
    //MoveDisplayが移動したとき、shapeは移動するが、bodyは移動しないのでその補正
    MyBox.prototype.updateBodyShape = function () {
        this.body.position[0] += MoveDisplay.moveSpeed[0];
        this.body.position[1] += MoveDisplay.moveSpeed[1];
        this.shape.x = this.body.position[0];
        this.shape.y = this.body.position[1];
        MoveDisplay.display.addChild(this.shape);
        if (this.shape.y > 2 * Game.height) {
            this.body.position[1] -= Game.height * 3;
        }
    };
    MyBox.prototype.addDestroyMethod = function () {
        if (this.shape) {
            MoveDisplay.display.removeChild(this.shape);
            this.shape = null;
        }
    };
    MyBox.prototype.updateContent = function () {
        this.updateBodyShape();
        //this.sideMove();
    };
    MyBox.prototype.collisionEvent = function () { };
    MyBox.sideMoveSpeed = 2;
    return MyBox;
}(PhysicsBox));
__reflect(MyBox.prototype, "MyBox");
var RightBox = (function (_super) {
    __extends(RightBox, _super);
    function RightBox(x, y, width, height, color) {
        return _super.call(this, x, y, width, height, color) || this;
    }
    RightBox.prototype.sideMove = function () {
        if (this.rightMoveFlag === true) {
            this.shape.x += MyBox.sideMoveSpeed;
            this.body.position[0] += MyBox.sideMoveSpeed;
            if (this.shape.x >= Game.width) {
                this.rightMoveFlag = false;
            }
        }
        else if (this.rightMoveFlag === false) {
            this.shape.x -= MyBox.sideMoveSpeed;
            this.body.position[0] -= MyBox.sideMoveSpeed;
            if (this.shape.x <= Game.width / 2 + this.shape.width / 2) {
                this.rightMoveFlag = true;
            }
        }
    };
    RightBox.prototype.updateContent = function () {
        if (Game.gameOverFlag == false) {
            this.updateBodyShape();
            this.sideMove();
        }
    };
    return RightBox;
}(MyBox));
__reflect(RightBox.prototype, "RightBox");
var LeftBox = (function (_super) {
    __extends(LeftBox, _super);
    function LeftBox(x, y, width, height, color) {
        return _super.call(this, x, y, width, height, color) || this;
    }
    LeftBox.prototype.sideMove = function () {
        if (this.rightMoveFlag === true) {
            this.shape.x += MyBox.sideMoveSpeed;
            this.body.position[0] += MyBox.sideMoveSpeed;
            if (this.shape.x >= Game.width / 2 - this.shape.width / 2) {
                this.rightMoveFlag = false;
            }
        }
        else if (this.rightMoveFlag === false) {
            this.shape.x -= MyBox.sideMoveSpeed;
            this.body.position[0] -= MyBox.sideMoveSpeed;
            if (this.shape.x <= 0) {
                this.rightMoveFlag = true;
            }
        }
    };
    LeftBox.prototype.updateContent = function () {
        if (Game.gameOverFlag == false) {
            this.updateBodyShape();
            this.sideMove();
        }
    };
    return LeftBox;
}(MyBox));
__reflect(LeftBox.prototype, "LeftBox");
//# sourceMappingURL=Box.js.map