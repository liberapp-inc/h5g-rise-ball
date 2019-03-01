// ゲームで便利に使えるUtilityクラス

class Utility{

    public static height: number;
    public static width: number;

    static init( eui:eui.UILayer ) {
        this.height = eui.stage.stageHeight;
        this.width  = eui.stage.stageWidth;
    }

    static random(min:number, max:number):number {
        return min + Math.random() * (max - min);
    }

    static randomInt(min:number, max:number):number {
        return Math.floor( min + Math.random() * (max+0.999 - min) );
    }

    static clamp(value:number, min:number, max:number):number {
        if( value < min ) value = min;
        if( value > max ) value = max;
        return value;
    }

    static color( r:number, g:number, b:number):number {
        return ( Math.floor(r * 0xff)*0x010000 + Math.floor(g * 0xff)*0x0100 + Math.floor(b * 0xff) );
    }

    static colorLerp( c0:number, c1:number, rate01:number):number {
        let rate10 = 1 - rate01;
        let color = 
            ( ((c0&0xff0000) * rate10 + (c1&0xff0000) * rate01) & 0xff0000 ) +
            ( ((c0&0xff00) * rate10 + (c1&0xff00) * rate01) & 0xff00 ) +
            ( ((c0&0xff) * rate10 + (c1&0xff) * rate01) & 0xff );
        return color;
    }

    static myText(x:number, y:number, text:string, size:number, ratio:number, color:number, bold:boolean): egret.TextField {
        
        let tf :egret.TextField = new egret.TextField();
        tf.x = x;
        tf.y = y;
        tf.text = text;
        tf.bold = bold;
        tf.size = size;

        tf.scaleX = ratio;
        tf.scaleY = ratio;

        tf.textColor = color;


        return tf;
    }

    static myStrokeText(x:number, y:number, text:string, size:number, ratio:number, color:number, font:string, stColor:number, stSize:number): egret.TextField {
        
        let tf :egret.TextField = new egret.TextField();
        tf.x = x;
        tf.y = y;

        tf.scaleX = ratio;
        tf.scaleY = ratio;
        tf.textFlow = <Array<egret.ITextElement>>[ 
            {text: text, 
                style: {
                    "textColor": color, "size": size, "fontFamily": font, "strokeColor": stColor, "stroke": stSize,
                }
            }
        ];    

        return tf;
    }

    
}
