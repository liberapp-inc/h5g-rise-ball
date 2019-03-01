// UnityのGameObjectライクなタスク管理クラス
//  update()に毎フレームの処理を書く
//  オブジェクトを破棄するときはdestroy()を呼ぶ
//  破棄のときに後処理が必要なら、onDestroy()に記述
//  生成時の初期化はUnityと違い、constructor()を使う（引数を渡せる）
//  シーンを切り替えたい場合は transitにシーンロード関数を設定（全オブジェクトを破棄してからtransitを実行）
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
var GameObject = (function () {
    function GameObject() {
        this.shape = null;
        this.destroyFlag = false;
        GameObject.objects.push(this);
    }
    GameObject.initial = function (displayObjectContainer) {
        GameObject.objects = [];
        GameObject.display = displayObjectContainer;
    };
    GameObject.update = function () {
        //繰り返しメソッド
        GameObject.objects.forEach(function (obj) { return obj.updateContent(); });
        //destroyFlagがtrueならshapeを削除
        GameObject.objects = GameObject.objects.filter(function (obj) {
            if (obj.destroyFlag)
                obj.delete();
            return (!obj.destroyFlag);
        });
        if (GameObject.transit) {
            GameObject.allDestroy();
            GameObject.transit();
            GameObject.transit = null;
        }
    };
    GameObject.allDestroy = function () {
        GameObject.objects = GameObject.objects.filter(function (obj) {
            obj.destroy();
            obj.delete();
            return false;
        });
    };
    //オブジェクトを削除
    GameObject.prototype.destroy = function () { this.destroyFlag = true; };
    //shapeの削除など、destroy後に後処理が必要なら記述
    GameObject.prototype.addDestroyMethod = function () { };
    GameObject.prototype.delete = function () {
        this.addDestroyMethod();
        if (this.shape) {
            GameObject.display.removeChild(this.shape);
            this.shape = null;
        }
    };
    GameObject.objects = [];
    return GameObject;
}());
__reflect(GameObject.prototype, "GameObject");
var PhysicsObject = (function (_super) {
    __extends(PhysicsObject, _super);
    function PhysicsObject() {
        var _this = _super.call(this) || this;
        _this.body = null;
        _this.bodyShape = null;
        return _this;
    }
    PhysicsObject.prototype.addDestroyMethod = function () {
        CreateWorld.world.removeBody(this.body);
    };
    PhysicsObject.world = null;
    return PhysicsObject;
}(GameObject));
__reflect(PhysicsObject.prototype, "PhysicsObject");
//# sourceMappingURL=GameObject.js.map