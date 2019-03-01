// ゲームで便利に使えるUtilityクラス
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Utility = (function () {
    function Utility() {
    }
    Utility.init = function (eui) {
        this.height = eui.stage.stageHeight;
        this.width = eui.stage.stageWidth;
    };
    Utility.random = function (min, max) {
        return min + Math.random() * (max - min);
    };
    Utility.randomInt = function (min, max) {
        return Math.floor(min + Math.random() * (max + 0.999 - min));
    };
    Utility.clamp = function (value, min, max) {
        if (value < min)
            value = min;
        if (value > max)
            value = max;
        return value;
    };
    Utility.color = function (r, g, b) {
        return (Math.floor(r * 0xff) * 0x010000 + Math.floor(g * 0xff) * 0x0100 + Math.floor(b * 0xff));
    };
    Utility.colorLerp = function (c0, c1, rate01) {
        var rate10 = 1 - rate01;
        var color = (((c0 & 0xff0000) * rate10 + (c1 & 0xff0000) * rate01) & 0xff0000) +
            (((c0 & 0xff00) * rate10 + (c1 & 0xff00) * rate01) & 0xff00) +
            (((c0 & 0xff) * rate10 + (c1 & 0xff) * rate01) & 0xff);
        return color;
    };
    Utility.myText = function (x, y, text, size, ratio, color, bold) {
        var tf = new egret.TextField();
        tf.x = x;
        tf.y = y;
        tf.text = text;
        tf.bold = bold;
        tf.size = size;
        tf.scaleX = ratio;
        tf.scaleY = ratio;
        tf.textColor = color;
        return tf;
    };
    Utility.myStrokeText = function (x, y, text, size, ratio, color, font, stColor, stSize) {
        var tf = new egret.TextField();
        tf.x = x;
        tf.y = y;
        tf.scaleX = ratio;
        tf.scaleY = ratio;
        tf.textFlow = [
            { text: text,
                style: {
                    "textColor": color, "size": size, "fontFamily": font, "strokeColor": stColor, "stroke": stSize,
                }
            }
        ];
        return tf;
    };
    return Utility;
}());
__reflect(Utility.prototype, "Utility");
//# sourceMappingURL=Utility.js.map