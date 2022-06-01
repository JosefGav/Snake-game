let gameState = 0;
let grid = [];
const gameScreen = document.getElementById("game")

document.addEventListener("keypress",()=>{
    gameState = 1;
})

const statuses = {
    snake:"snake",
    apple:"apple",
    empty: "empty",
    head: "head",
}

class Gridspace {
    constructor(status,x,y,element){
        this._x = x;
        this._y = y;
        this._status = status;
        this._element = element;
        this._element.className = status; 
    }

    set x(x){
        this._x = x;
    }
    get x(){
        return this._x
    }
    
    set y(y){
        this._y = y;
    }
    get y(){
        return this._y
    }

    set status(status){
        this._status = status;
        this._element.className = status;
    }
    get status(){
        return this._status
    }
}

function createGrid(){
    for (let y = 0; y < 5; y++){
        let row = [];
        for (let x = 0; x < 5; x++) {
            const element = document.createElement("div");
            gameScreen.appendChild(element);

            tile = new Gridspace(statuses.empty,x,y,element)
            row.push(tile)
        }
        grid.push(row)
    }
}
createGrid()
