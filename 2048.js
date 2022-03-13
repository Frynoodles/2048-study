// MVC model view controller


//constant



// model



// view
class View{
    constructor(container){
        this.container = container;
        this.initializeContainers();
    }
    initializeContainers(){
        this.container.style.width = 600;
        this.container.style.height = 600;
        this.container.style.backgroundColor = "rgba(90,80,70,0.3)";
    }
}


// controller

var container =document.getElementById("game-container");
var view=new View(container);