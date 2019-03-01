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
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.once(egret.Event.ADDED_TO_STAGE, _this.addToStage, _this);
        return _this;
    }
    Main.prototype.addToStage = function () {
        GameObject.initial(this.stage);
        //MainCamera.initial(this.stage);
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
        /* new メソッドを記入*/
        new MainCamera();
        new CreateWorld();
        new PhysicsBall(300, 0, 50);
        new PhysicsBox(300, 700, 100, 50, 0xff0000);
    };
    return Game;
}());
__reflect(Game.prototype, "Game");
var Background = (function (_super) {
    __extends(Background, _super);
    function Background() {
        var _this = _super.call(this) || this;
        _this.shape = new egret.Shape();
        _this.shape.graphics.beginFill(0x00c0e0);
        _this.shape.graphics.drawRect(0, 0, Utility.width, Utility.height);
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
        return _this;
    }
    CreateWorld.prototype.createWorld = function () {
        CreateWorld.world = new p2.World();
        CreateWorld.world.sleepMode = p2.World.BODY_SLEEPING;
        CreateWorld.world.gravity = [0, 9.8];
    };
    CreateWorld.worldBegin = function (dt) {
        CreateWorld.world.step(1 / 60, dt / 1000, 10);
        return false;
    };
    //コリジョンイベントはここにまとめる
    CreateWorld.prototype.collision = function (evt) {
    };
    CreateWorld.prototype.addDestroyMethod = function () { CreateWorld.world.clear(); };
    CreateWorld.prototype.updateContent = function () { };
    CreateWorld.prototype.collisionEvent = function () { };
    CreateWorld.I = null;
    return CreateWorld;
}(PhysicsObject));
__reflect(CreateWorld.prototype, "CreateWorld");
//# sourceMappingURL=Main.js.map