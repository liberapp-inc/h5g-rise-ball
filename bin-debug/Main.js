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
//衝突判定用の列挙
var GraphicShape;
(function (GraphicShape) {
    GraphicShape[GraphicShape["NONE"] = Math.pow(2, 0)] = "NONE";
    GraphicShape[GraphicShape["CIECLE"] = Math.pow(2, 1)] = "CIECLE";
    GraphicShape[GraphicShape["BOX"] = Math.pow(2, 2)] = "BOX";
    GraphicShape[GraphicShape["LINE"] = Math.pow(2, 3)] = "LINE";
    GraphicShape[GraphicShape["DEAD_LINE"] = Math.pow(2, 4)] = "DEAD_LINE";
})(GraphicShape || (GraphicShape = {}));
//Boxの種類
var BoxType;
(function (BoxType) {
    BoxType[BoxType["NORMAL"] = 0] = "NORMAL";
    BoxType[BoxType["BOLD"] = 1] = "BOLD";
    BoxType[BoxType["FAST"] = 2] = "FAST";
})(BoxType || (BoxType = {}));
//stageLevelの段階
var StageLevel;
(function (StageLevel) {
    StageLevel[StageLevel["ONE"] = 0] = "ONE";
    StageLevel[StageLevel["TWO"] = 1] = "TWO";
    StageLevel[StageLevel["THREE"] = 2] = "THREE";
})(StageLevel || (StageLevel = {}));
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.once(egret.Event.ADDED_TO_STAGE, _this.addToStage, _this);
        return _this;
    }
    Main.prototype.addToStage = function () {
        GameObject.initial(this.stage);
        Util.init(this); //euiレイヤーのサイズの取得
        Game.init();
        egret.startTick(this.tickLoop, this);
    };
    Main.prototype.tickLoop = function (timeStamp) {
        GameObject.update();
        CreateWorld.worldBegin(timeStamp);
        return false;
    };
    return Main;
}(eui.UILayer));
__reflect(Main.prototype, "Main");
var Game = (function () {
    function Game() {
    }
    Game.init = function () {
        this.height = egret.MainContext.instance.stage.stageHeight;
        this.width = egret.MainContext.instance.stage.stageWidth;
        Game.gameOverFlag = false;
        /* new メソッドを記入*/
        new Background();
        new MoveDisplay();
        new CreateWorld();
        new CreateObject();
        new MyBall(Game.width / 2, Game.height - 50, 50);
        new Score();
    };
    Game.gameOverFlag = false;
    Game.stageLevel = StageLevel.ONE;
    return Game;
}());
__reflect(Game.prototype, "Game");
var Background = (function (_super) {
    __extends(Background, _super);
    function Background() {
        var _this = _super.call(this) || this;
        _this.shape = new egret.Shape();
        _this.shape.graphics.beginFill(0x000080);
        _this.shape.graphics.drawRect(0, 0, Game.width, Game.height);
        _this.shape.graphics.endFill();
        GameObject.display.addChild(_this.shape);
        return _this;
    }
    Background.prototype.updateContent = function () { };
    return Background;
}(GameObject));
__reflect(Background.prototype, "Background");
var CreateWorld = (function (_super) {
    __extends(CreateWorld, _super);
    function CreateWorld() {
        var _this = _super.call(this) || this;
        CreateWorld.I = _this;
        _this.createWorld();
        CreateWorld.world.on("beginContact", _this.collision, _this);
        CreateWorld.world.on("endContact", _this.collisionEnd, _this);
        return _this;
    }
    CreateWorld.prototype.createWorld = function () {
        CreateWorld.world = new p2.World();
        CreateWorld.world.sleepMode = p2.World.BODY_SLEEPING;
        CreateWorld.world.gravity = [0, 9.8];
    };
    CreateWorld.worldBegin = function (dt) {
        if (Game.gameOverFlag == false) {
            CreateWorld.world.step(1 / 60, dt / 1000, 10);
        }
        return false;
    };
    //コリジョンイベントはここにまとめる
    CreateWorld.prototype.collision = function (evt) {
        var bodyA = evt.bodyA;
        var bodyB = evt.bodyB;
        var shapeA = evt.shapeA;
        var shapeB = evt.shapeB;
        this.checkShape(shapeA, shapeB);
    };
    CreateWorld.prototype.collisionEnd = function () {
    };
    CreateWorld.prototype.checkShape = function (myShape, yourShape) {
        //BallとBoxがぶつかったらゲームオーバー
        if (myShape.collisionGroup == GraphicShape.CIECLE && yourShape.collisionGroup == GraphicShape.BOX) {
            Game.gameOverFlag = true;
            if (Game.gameOverFlag) {
                new GameOver();
            }
        }
        else if (yourShape.collisionGroup == GraphicShape.CIECLE && myShape.collisionGroup == GraphicShape.BOX) {
            Game.gameOverFlag = true;
            if (Game.gameOverFlag) {
                new GameOver();
            }
        }
        else if (myShape.collisionGroup == GraphicShape.CIECLE && yourShape.collisionGroup == GraphicShape.LINE) {
            Score.I.addScore();
            yourShape.collisionMask = GraphicShape.NONE;
        }
        else if (yourShape.collisionGroup == GraphicShape.CIECLE && myShape.collisionGroup == GraphicShape.LINE) {
            Score.I.addScore();
            myShape.collisionMask = null;
        }
        else {
        }
    };
    CreateWorld.prototype.addDestroyMethod = function () { CreateWorld.world.clear(); };
    CreateWorld.prototype.updateContent = function () { };
    CreateWorld.I = null;
    return CreateWorld;
}(PhysicsObject));
__reflect(CreateWorld.prototype, "CreateWorld");
var CreateObject = (function (_super) {
    __extends(CreateObject, _super);
    function CreateObject() {
        var _this = _super.call(this) || this;
        _this.createBox();
        return _this;
    }
    CreateObject.prototype.createBox = function () {
        for (var i = 0; i < 6; i++) {
            var posY = Game.height / 2;
            new ScoreLine(Game.width / 2, -2 * Game.height + posY * i, Game.width, 0, ScoreLine.scoreLineColor);
            new RightBox(Game.width, -2 * Game.height + posY * i, 300, 50, MyBox.normalBoxColor);
            new LeftBox(0, -2 * Game.height + posY * i, 300, 50, MyBox.normalBoxColor);
        }
    };
    CreateObject.prototype.updateContent = function () {
        switch (Score.I.score) {
            case 0:
                Game.stageLevel = StageLevel.ONE;
                MyBox.sideMoveSpeed = 2;
                break;
            case 5:
                Game.stageLevel = StageLevel.TWO;
                MyBox.sideMoveSpeed = 2;
                break;
            case 10:
                Game.stageLevel = StageLevel.THREE;
                MyBox.sideMoveSpeed = 4;
                break;
        }
    };
    return CreateObject;
}(GameObject));
__reflect(CreateObject.prototype, "CreateObject");
//# sourceMappingURL=Main.js.map