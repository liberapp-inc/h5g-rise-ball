class CreateGameScene extends GameObject{
    
    static createPosY : number = 0;

    static scoreLine : ScoreLine[] = [];

    static rightBlock : Block[] = [];
    static leftBlock : Block[] = [];
    private blockMoveSpeed : number = 5;
    private normalBlockHeight : number;
    private boldBlockHeight : number;
    private speedBlockHeight : number;


    constructor(){
        super();
        CreateGameScene.createPosY = Game.height;
        CreateGameScene.scoreLine = [];
        CreateGameScene.leftBlock = [];
        CreateGameScene.rightBlock = [];
        this.normalBlockHeight = Game.width*0.16;
        this.boldBlockHeight = this.normalBlockHeight * 4;
        this.speedBlockHeight = this.normalBlockHeight * 0.5;
        this.initialBlock();
        

    }


    private initialBlock(){
        new ScoreLine(0, -Game.height * 0, Game.width, 0, 4, ColorPallet.GREEN);
        new ScoreLine(0, -Game.height * 1, Game.width, 0, 4, ColorPallet.GREEN);
        new Block(0,            0,              Game.width/2, this.normalBlockHeight, this.setMoveSpeed(BlockType.NOMAL));
        new Block(Game.width,   0,              Game.width/2, this.normalBlockHeight, this.setMoveSpeed(BlockType.NOMAL));
        new Block(0,            -Game.height,   Game.width/2, this.normalBlockHeight, this.setMoveSpeed(BlockType.NOMAL));
        new Block(Game.width,   -Game.height,   Game.width/2, this.normalBlockHeight, this.setMoveSpeed(BlockType.NOMAL));


    }

    private creatBlock(){
        if(CreateGameScene.createPosY - Player.I.compornent.y  > Game.height){
            const x :number = Util.randomInt(0,Game.width/2.1);
            const y :number = CreateGameScene.createPosY - Game.height*3;
            CreateGameScene.createPosY -= Game.height;
            const blockType : number = Util.randomInt(BlockType.NOMAL, BlockType.SPEED);
            
            switch(blockType){
                case BlockType.NOMAL:
                    new ScoreLine(0,    y, Game.width, 0, 4, ColorPallet.GREEN);
                    new Block(x,                y, Game.width/2, this.normalBlockHeight, this.setMoveSpeed(blockType));
                    new Block(Game.width - x,   y, Game.width/2, this.normalBlockHeight, this.setMoveSpeed(blockType));
                break;
                case BlockType.BOLD:
                    new ScoreLine(0,    y, Game.width, 0, 4, ColorPallet.GREEN);
                    new Block(x,                y, Game.width/2, this.boldBlockHeight, this.setMoveSpeed(blockType));
                    new Block(Game.width - x,   y, Game.width/2, this.boldBlockHeight, this.setMoveSpeed(blockType));
                break;
                case BlockType.SPEED:
                    new ScoreLine(0,    y, Game.width, 0, 4, ColorPallet.GREEN);
                    new Block(x,                y, Game.width/2, this.speedBlockHeight, this.setMoveSpeed(blockType));
                    new Block(Game.width - x,   y, Game.width/2, this.speedBlockHeight, this.setMoveSpeed(blockType));
                break;
            }
            
        }
        
    }

    private moveBlock(){
        CreateGameScene.leftBlock.forEach(b =>{
            if(!b.destroyFlag){
                if(b.getToRight()){
                    b.body.position[0] += b.getMoveSpeed();
                    if(b.body.position[0] > Game.width/2 - b.compornent.width/2){
                        b.body.position[0] = Game.width/2 - b.compornent.width/2;
                        b.setToRight(false);
                    }
                }
                else{
                    b.body.position[0] -= b.getMoveSpeed();
                    if(b.body.position[0] < 0 - b.compornent.width/2){
                        b.body.position[0] = 0 - b.compornent.width/2;
                        b.setToRight(true);
                    }
                }

            }
        });

        CreateGameScene.rightBlock.forEach(b =>{
            if(!b.destroyFlag){
                if(b.getToRight()){
                    b.body.position[0] += b.getMoveSpeed();
                    if(b.body.position[0] > Game.width + b.compornent.width/2){
                        b.body.position[0] = Game.width + b.compornent.width/2;
                        b.setToRight(false);
                    }
                }
                else{
                    b.body.position[0] -= b.getMoveSpeed();
                    if(b.body.position[0] < Game.width/2 + b.compornent.width/2){
                        b.body.position[0] = Game.width/2 + b.compornent.width/2;
                        b.setToRight(true);
                    }
                }
            }
        });        
    }

    private setMoveSpeed(blockType : number) :number{
        let speed :number = this.blockMoveSpeed + Score.score/2.5;
        switch(blockType){
            case BlockType.BOLD:
            speed *= 0.5;
            break;
            case BlockType.SPEED:
            speed *= 1.5;
            break;
        }
        if(speed >= 40){
            speed = 40;
        }
        else if(speed <= 0){
            speed = 1;
        }
        return speed;
    }

    static freshArray(){
            const newArray : Block[] = CreateGameScene.rightBlock.filter(obj => obj.destroyFlag !== true);
            CreateGameScene.rightBlock = newArray;

            const newArray2 : Block[] = CreateGameScene.leftBlock.filter(obj => obj.destroyFlag !== true);
            CreateGameScene.leftBlock = newArray2;

            const newArray3 : ScoreLine[] = CreateGameScene.scoreLine.filter(obj => obj.destroyFlag !== true);
            CreateGameScene.scoreLine = newArray3;
    }

    updateContent(){
        if(!GameOver.gameOverFlag){
            this.creatBlock();
            this.moveBlock();

        }
    }

}