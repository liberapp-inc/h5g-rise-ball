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
var CreateGameScene = (function (_super) {
    __extends(CreateGameScene, _super);
    function CreateGameScene() {
        var _this = _super.call(this) || this;
        _this.blockMoveSpeed = 5;
        CreateGameScene.createPosY = Game.height;
        CreateGameScene.scoreLine = [];
        CreateGameScene.leftBlock = [];
        CreateGameScene.rightBlock = [];
        _this.normalBlockHeight = Game.width * 0.16;
        _this.boldBlockHeight = _this.normalBlockHeight * 4;
        _this.speedBlockHeight = _this.normalBlockHeight * 0.5;
        _this.initialBlock();
        return _this;
    }
    CreateGameScene.prototype.initialBlock = function () {
        new ScoreLine(0, -Game.height * 0, Game.width, 0, 4, ColorPallet.GREEN);
        new ScoreLine(0, -Game.height * 1, Game.width, 0, 4, ColorPallet.GREEN);
        new Block(0, 0, Game.width / 2, this.normalBlockHeight, this.setMoveSpeed(BlockType.NOMAL));
        new Block(Game.width, 0, Game.width / 2, this.normalBlockHeight, this.setMoveSpeed(BlockType.NOMAL));
        new Block(0, -Game.height, Game.width / 2, this.normalBlockHeight, this.setMoveSpeed(BlockType.NOMAL));
        new Block(Game.width, -Game.height, Game.width / 2, this.normalBlockHeight, this.setMoveSpeed(BlockType.NOMAL));
    };
    CreateGameScene.prototype.creatBlock = function () {
        if (CreateGameScene.createPosY - Player.I.compornent.y > Game.height) {
            var x = Util.randomInt(0, Game.width / 2.1);
            var y = CreateGameScene.createPosY - Game.height * 3;
            CreateGameScene.createPosY -= Game.height;
            var blockType = Util.randomInt(BlockType.NOMAL, BlockType.SPEED);
            switch (blockType) {
                case BlockType.NOMAL:
                    new ScoreLine(0, y, Game.width, 0, 4, ColorPallet.GREEN);
                    new Block(x, y, Game.width / 2, this.normalBlockHeight, this.setMoveSpeed(blockType));
                    new Block(Game.width - x, y, Game.width / 2, this.normalBlockHeight, this.setMoveSpeed(blockType));
                    break;
                case BlockType.BOLD:
                    new ScoreLine(0, y, Game.width, 0, 4, ColorPallet.GREEN);
                    new Block(x, y, Game.width / 2, this.boldBlockHeight, this.setMoveSpeed(blockType));
                    new Block(Game.width - x, y, Game.width / 2, this.boldBlockHeight, this.setMoveSpeed(blockType));
                    break;
                case BlockType.SPEED:
                    new ScoreLine(0, y, Game.width, 0, 4, ColorPallet.GREEN);
                    new Block(x, y, Game.width / 2, this.speedBlockHeight, this.setMoveSpeed(blockType));
                    new Block(Game.width - x, y, Game.width / 2, this.speedBlockHeight, this.setMoveSpeed(blockType));
                    break;
            }
        }
    };
    CreateGameScene.prototype.moveBlock = function () {
        CreateGameScene.leftBlock.forEach(function (b) {
            if (!b.destroyFlag) {
                if (b.getToRight()) {
                    b.body.position[0] += b.getMoveSpeed();
                    if (b.body.position[0] > Game.width / 2 - b.compornent.width / 2) {
                        b.body.position[0] = Game.width / 2 - b.compornent.width / 2;
                        b.setToRight(false);
                    }
                }
                else {
                    b.body.position[0] -= b.getMoveSpeed();
                    if (b.body.position[0] < 0 - b.compornent.width / 2) {
                        b.body.position[0] = 0 - b.compornent.width / 2;
                        b.setToRight(true);
                    }
                }
            }
        });
        CreateGameScene.rightBlock.forEach(function (b) {
            if (!b.destroyFlag) {
                if (b.getToRight()) {
                    b.body.position[0] += b.getMoveSpeed();
                    if (b.body.position[0] > Game.width + b.compornent.width / 2) {
                        b.body.position[0] = Game.width + b.compornent.width / 2;
                        b.setToRight(false);
                    }
                }
                else {
                    b.body.position[0] -= b.getMoveSpeed();
                    if (b.body.position[0] < Game.width / 2 + b.compornent.width / 2) {
                        b.body.position[0] = Game.width / 2 + b.compornent.width / 2;
                        b.setToRight(true);
                    }
                }
            }
        });
    };
    CreateGameScene.prototype.setMoveSpeed = function (blockType) {
        var speed = this.blockMoveSpeed + Score.score / 2.5;
        switch (blockType) {
            case BlockType.BOLD:
                speed *= 0.5;
                break;
            case BlockType.SPEED:
                speed *= 1.5;
                break;
        }
        if (speed >= 40) {
            speed = 40;
        }
        else if (speed <= 0) {
            speed = 1;
        }
        return speed;
    };
    CreateGameScene.freshArray = function () {
        var newArray = CreateGameScene.rightBlock.filter(function (obj) { return obj.destroyFlag !== true; });
        CreateGameScene.rightBlock = newArray;
        var newArray2 = CreateGameScene.leftBlock.filter(function (obj) { return obj.destroyFlag !== true; });
        CreateGameScene.leftBlock = newArray2;
        var newArray3 = CreateGameScene.scoreLine.filter(function (obj) { return obj.destroyFlag !== true; });
        CreateGameScene.scoreLine = newArray3;
    };
    CreateGameScene.prototype.updateContent = function () {
        if (!GameOver.gameOverFlag) {
            this.creatBlock();
            this.moveBlock();
        }
    };
    CreateGameScene.createPosY = 0;
    CreateGameScene.scoreLine = [];
    CreateGameScene.rightBlock = [];
    CreateGameScene.leftBlock = [];
    return CreateGameScene;
}(GameObject));
__reflect(CreateGameScene.prototype, "CreateGameScene");
//# sourceMappingURL=CreateGameScene.js.map