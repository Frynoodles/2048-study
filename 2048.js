// MVC model view controller


//constant
//将数字设置成常量
//画布高和框，其实可以直接设置成CANVAS_SIZE=650;
CANVAS_HEIGHT = 650;
CANVAS_WIDTH = 650;
//画布背景颜色
CANVAS_BACKGROUND_COLOR = "rgba(255,100,0,0.6)";
//block数量
BLOCK_QUANTITY = 4;
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
//间隔大小
PADDING_SIZE = (CANVAS_HEIGHT - BLOCK_QUANTITY * BLOCK_SIZE) / (BLOCK_QUANTITY + 1)





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
        for (let i = 0; i < BLOCK_QUANTITY; i++) {
            let temp = [];
            for (let j = 0; j < BLOCK_QUANTITY; j++) {
                temp.push(null);
            }
            this.data.push(temp);
        }
        //游戏开始，随机给两个block赋值 2
        this.data = this.generateNewBlock(this.data);
        this.data = this.generateNewBlock(this.data);
    }
    /**
     *
     * @param {Array} arr 原数据
     * @returns 赋值后的数据
     * 随机给一个block赋值
     */
    generateNewBlock(arr) {
        //首先搜集所有空的位置
        let emptyBlock = [];
        for (let i = 0; i < BLOCK_QUANTITY; i++) {
            for (let j = 0; j < BLOCK_QUANTITY; j++) {
                if (arr[i][j] == null) {
                    //找出空的数组(block)并放进emptyBlock
                    emptyBlock.push([i, j]);
                }
            }
        }
        //调用randChoice，随机返回emptyBlock中的一个数组(block)
        let position = randChoice(emptyBlock);
        //给这个数组赋值2
        arr[position[0]][position[1]] = 2;
        return arr;
    }

    /**
     *
     * @param {Array} arr 一个n*n的数组，也就是最开始创建的data[]
     * @returns {Array} arr 传回的值，要进行处理
     * @description 方块移动,以向左为蓝本进行设计，所以要在传进来之前对数据进行处理
     */
    shiftBlock(arr) {
        for (let i = 0; i < BLOCK_QUANTITY; i++) {
            //向左
            //先动的
            let ahead = 1;
            //后动的
            let behind = 0;
            for (; ahead < BLOCK_QUANTITY; ahead++) {
                if (arr[i][behind] == null && arr[i][ahead] == null) {

                } else if (arr[i][behind] == null && arr[i][ahead] != null) {
                    arr[i][behind] = arr[i][ahead];
                    arr[i][ahead] = null;
                } else if (arr[i][behind] != null && arr[i][ahead] == null) {

                } else if (arr[i][behind] != null && arr[i][ahead] != null && arr[i][behind] == arr[i][ahead]) {
                    arr[i][behind] *= 2;
                    arr[i][ahead] = null;
                    behind++;
                } else if (arr[i][behind] != null && arr[i][ahead] != null && arr[i][behind] != arr[i][ahead]) {
                    if(ahead-behind>1){
                        arr[i][behind + 1] = arr[i][ahead];
                        arr[i][ahead] = null;
                    }
                    behind++;
                }
            }
        }
        return this.generateNewBlock(arr);;
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
     * 画出方块及背景色
     */
    drawGame() {
        for (let i = 0; i < BLOCK_QUANTITY; i++) {
            for (let j = 0; j < BLOCK_QUANTITY; j++) {
                //画出block的底色
                this.drawBackgroundBlock(i, j, BLOCK_BACKGROUND_COLOR);
                if (this.game.data[i][j]) {
                    this.drawBlock(i, j, this.game.data[i][j]);
                }
            }
        }
    }

    /**
     * @param {Array} arr 用来更新的data[]
     * 更新block
    */
    refreshBlock(arr) {
        this.data = arr;
        this.container.innerHTML = "";
        this.drawGame();
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
        block.style.top = PADDING_SIZE * (i + 1) + BLOCK_SIZE * i;
        block.style.left = PADDING_SIZE * (j + 1) + BLOCK_SIZE * j;
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
        /**
         * 他用的方法
         * span.style.position="absolute";
         * span.style.top=(BLOCK_SIZE-span.offsetHeight)/2;
         * span.style.left=(BLOCK_SIZE-span.offsetWidth)/2;
         * block的高-文字的高的差的二分之一，也就是文字顶部离block边框的距离，水平居中的方法同理
         */


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
document.addEventListener('keyup', (e) => {
    switch (e.keyCode) {
        case 37:
            //左
            console.log(view.game.data);
            view.refreshBlock(view.game.shiftBlock(view.game.data));
            break;
        case 38:
            //向上
            break;
        case 39:
            //向右
            break;
        case 40:
            //向下
            break;
        default:
    }
})