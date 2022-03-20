// MVC model view controller


//constant
//将数字设置成常量
//画布高和框，其实可以直接设置成CANVAS_SIZE=650;
CANVAS_HEIGHT = 650;
CANVAS_WIDTH = 650;
//画布背景颜色
CANVAS_BACKGROUND_COLOR = "rgba(255,100,0,0.6)";
//block数量
GAME_SIZE = 4;
//block大小
BLOCK_SIZE = 150;
//block背景颜色
BLOCK_BACKGROUND_COLOR = "rgba(248,248,255,0.6)";
//block有数字时的颜色
BLOCK_FRONT_COLOR = "rgba(0,206,209,0.5)";
//文字大小
FONTSIZE = 80;
//文字颜色
TEXT_COLOR = "rgbA(230,0,0,0.5)";

// Global Utility Function

/**
 * @description 返回一个a和b之间的数
 */
randInt = function (a, b) {
    return a + Math.floor(Math.random() * (b + 1 - a));
}

/**
 * @description 随机返回数组arr中的一个值（具体是什么看数组放的什么）
 */
randChoice = function (arr) {
    return arr[randInt(0, arr.length - 1)];
}




// model

/**
 * @description 游戏的主体程序
 */
class Game {
    constructor() {
        //初始化data[],data[]是游戏的数据，为4*4的二维数组
        this.data = [];
        this.initializeData();
    }
    /**
     * 初始化，并随机生成两个block为2
     */
    initializeData() {
        this.data = [];
        for (let i = 0; i < GAME_SIZE; i++) {
            let temp = [];
            for (let j = 0; j < GAME_SIZE; j++) {
                temp.push(null);
            }
            this.data.push(temp);
        }
        //游戏开始，随机给两个block赋值 2
        this.generateNewBlock();
        this.generateNewBlock();
    }
    /**
     * 随机给一个block赋值
     */
    generateNewBlock() {
        //首先搜集所有空的位置
        let emptyBlock = [];
        for (let i = 0; i < GAME_SIZE; i++) {
            for (let j = 0; j < GAME_SIZE; j++) {
                if (this.data[i][j] == null) {
                    //找出空的数组(block)并放进emptyBlock
                    emptyBlock.push([i, j]);
                }
            }
        }
        //调用randChoice，随机返回emptyBlock中的一个数组(block)
        let position = randChoice(emptyBlock);
        //给这个数组赋值2
        this.data[position[0]][position[1]] = 2;
    }
}


// view
/**
 * 视觉部分
 */
class View {
    //构造函数
    constructor(container, game) {
        this.container = container;
        this.game = game;
        this.initializeContainers();
    }
    /**
     * 初始化画布
     */
    initializeContainers() {
        this.container.style.width = CANVAS_WIDTH;
        this.container.style.height = CANVAS_HEIGHT;
        this.container.style.backgroundColor = CANVAS_BACKGROUND_COLOR;
        this.container.style.position = "relative";
        this.container.style.display = "inline-block";
    }
    /**
     * 画出方块
     */
    drawGame() {
        for (let i = 0; i < GAME_SIZE; i++) {
            for (let j = 0; j < GAME_SIZE; j++) {
                //画出block的底色
                this.drawBackgroundBlock(i, j, BLOCK_BACKGROUND_COLOR);
                if (this.game.data[i][j]) {
                    this.drawBlock(i, j, this.game.data[i][j]);
                }
            }
        }
    }
    /**
     *
     * @param {int} i 横坐标
     * @param {int} j 纵坐标
     * @param {String} color 颜色值，使用rgba
     * @description 画每一个方块的具体函数
     * @returns {object} block 目标block
     */
    drawBackgroundBlock(i, j, color) {
        let block = document.createElement("div");
        block.style.width = BLOCK_SIZE;
        block.style.height = BLOCK_SIZE;
        block.style.backgroundColor = color;
        //根据上级找位置，对象是第一个有位置设置的
        block.style.position = "absolute";
        block.style.top = ((CANVAS_HEIGHT/**画布大小*/ - (GAME_SIZE/**方块数量 */ * BLOCK_SIZE/**block大小 */)) / 5) * (i + 1) + BLOCK_SIZE * i;
        block.style.left = ((CANVAS_WIDTH - (GAME_SIZE * BLOCK_SIZE)) / 5) * (j + 1) + BLOCK_SIZE * j;
        this.container.append(block);
        return block;
    }
    /**
     *
     * @param {int} i 横坐标
     * @param {int} j 纵坐标
     * @param {int} number 值
     * @description 画出block上的数字
     */
    drawBlock(i, j, number) {
        //画出有数字的block的颜色和数字
        let span = document.createElement("span");
        // 给有数字的block画上一层颜色
        let block = this.drawBackgroundBlock(i, j, BLOCK_FRONT_COLOR);
        //创建数字的文本
        let text = document.createTextNode(number);
        /**
         * 设置文本的高度为span的大小
         * 我提供了两种算法，一种是`${BLOCK_SIZE}px`强行设置为150px
         * 另一种是block的大小除以字体的大小
         * 设单位就是直接按单位来，不设单位就是系数，实际行高会变成（系数*字体大小）
         * 这涉及到line-height的继承关系，如果父类设置了line-height的单位，则直接继承这个单位，父类没设置单位，则是系数属性，所以子类不设单位的情况下就是系数
         * 可参考http://www.yalewoo.com/css_line-height.html?msclkid=9561f828a85811eca83e6b473b37446c
         *
        */
        span.style.lineHeight = /*`${BLOCK_SIZE}px`*/BLOCK_SIZE / FONTSIZE;
        //设置文本大小
        span.style.fontSize = FONTSIZE;
        //设置文字颜色
        span.style.color = TEXT_COLOR;
        span.appendChild(text);
        block.appendChild(span);
    }
}


// controller

var container = document.getElementById("game-container");
var game = new Game();
var view = new View(container, game);
view.drawGame();
