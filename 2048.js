// MVC model view controller


//constant
//将数字设置成常量
CANVAS_HEIGHT=600;
CANVAS_WIDTH=600;
CANVAS_BACKGROUND_COLOR= "rgba(255,255,0,0.3)"


// model
class Game{
    constructor() {
        this.data=[];
        this.initializeData();
    }
    initializeData(){
        this.data=[];
        
    }
}


// view
class View{
    constructor(container){
        this.container = container;
        this.initializeContainers();
    }
    initializeContainers(){
        this.container.style.width = CANVAS_WIDTH;
        this.container.style.height = CANVAS_HEIGHT;
        this.container.style.backgroundColor = CANVAS_BACKGROUND_COLOR;
    }
}


// controller

var container =document.getElementById("game-container");
var view=new View(container);