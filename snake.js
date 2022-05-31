let snake = [];
const directions = {
    up: "up",
    right:"right",
    down: "down",
    left: "left"
}
let leadingBall = {
    x:20,
    y:39,
    direction: directions.up,
}
let historyOfLeadingBallPositions = [[leadingBall.x,leadingBall.y]];
let snakeLength = 5;

setTimeout(()=> grid[Math.floor(Math.random()*40)][Math.floor(Math.random()*40)].status = statuses.apple, 100)

setInterval(() => {
    if (gameState===1) {
        

        for (let i = 0; i < snakeLength; i++) {
            try{grid[historyOfLeadingBallPositions[i][1]][historyOfLeadingBallPositions[i][0]].status = statuses.empty;}
            catch{}
        }

        if (leadingBall.direction === directions.up) leadingBall.y--;
        else if (leadingBall.direction === directions.right) leadingBall.x++;
        else if (leadingBall.direction === directions.down) leadingBall.y++;
        else if (leadingBall.direction === directions.left) leadingBall.x--;
        

        historyOfLeadingBallPositions.unshift([leadingBall.x,leadingBall.y]);
        if (grid[leadingBall.y][leadingBall.x].status === statuses.apple) {
            grid[leadingBall.y][leadingBall.x].status === statuses.empty;
            snakeLength++;
            generateFood()
        }

        


        for (let i = 1; i < snakeLength; i++) {
            try{grid[historyOfLeadingBallPositions[i][1]][historyOfLeadingBallPositions[i][0]].status = statuses.snake;}
            catch{}
        }
        if (grid[leadingBall.y][leadingBall.x].status === statuses.snake) {gameState = 2; return}
        try{grid[historyOfLeadingBallPositions[0][1]][historyOfLeadingBallPositions[0][0]].status = statuses.head;}
        catch{}

        
        
    }
}, 250);

document.addEventListener("keydown",e => {
    if (gameState != 2) gameState = 1;
    switch (e.keyCode){
        case 38:
            leadingBall.direction = directions.up;
            break;
        case 39:
            leadingBall.direction = directions.right;
            break;
        case 40:
            leadingBall.direction = directions.down;
            break;
        case 37:
            leadingBall.direction = directions.left;
            break;
    }
})

function generateFood() {
    let x = Math.floor(Math.random()*40);
    let y = Math.floor(Math.random()*40);

    while (grid[y][x].status === statuses.snake || grid[y][x].status === statuses.head) {
        x = Math.floor(Math.random()*40);
        y = Math.floor(Math.random()*40);
    }

    grid[y][x].status = statuses.apple;
} 