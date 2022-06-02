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
        try{
            if (grid[leadingBall.y][leadingBall.x].status === statuses.apple) {
                grid[leadingBall.y][leadingBall.x].status === statuses.head;
                snakeLength++;
                generateFood()
            }
        } catch {}

        


        for (let i = 1; i < snakeLength; i++) {
            try{grid[historyOfLeadingBallPositions[i][1]][historyOfLeadingBallPositions[i][0]].status = statuses.snake;}
            catch{}
        }
        
        if (leadingBall.y >= 40 || leadingBall.y < 0 || leadingBall.x < 0 || leadingBall.x >= 40) {gameState = 2; return}
        if (grid[leadingBall.y][leadingBall.x].status === statuses.snake ) {gameState = 2; return}

        try{grid[historyOfLeadingBallPositions[0][1]][historyOfLeadingBallPositions[0][0]].status = statuses.head;}
        catch{}

        
        
    } 
}, 100);

document.addEventListener("keydown",e => {
    if (gameState != 2) gameState = 1;
    
    switch (e.keyCode){
        case 38:
            if (leadingBall.direction != directions.down){changeDirection(directions.up)
            leadingBall.direction = directions.up;}

            break;
        case 39:
            if (leadingBall.direction != directions.left) {changeDirection(directions.right)
            leadingBall.direction = directions.right;}
            break;
        case 40:
            if (leadingBall.direction != directions.up) {changeDirection(directions.down)
            leadingBall.direction = directions.down;}
            break;
        case 37:
            if (leadingBall.direction != directions.right) {changeDirection(directions.left)
            leadingBall.direction = directions.left;}
            break;
        case 82:
            leadingBall = {
                x:20,
                y:39,
                direction: directions.up,
            }
            historyOfLeadingBallPositions = [[leadingBall.x,leadingBall.y]];
            snakeLength = 5;

            for (let y = 0; y < 40 ; y ++) {
                for (let x = 0; x < 40; x++){
                    grid[y][x].status = statuses.empty;
                }
            }
            gameState = 0;
            setTimeout(()=> grid[Math.floor(Math.random()*40)][Math.floor(Math.random()*40)].status = statuses.apple, 100)
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

function changeDirection(direction){
    if (gameState === 1 && leadingBall.direction != direction) {
        for (let i = 0; i < snakeLength; i++) {
            try{grid[historyOfLeadingBallPositions[i][1]][historyOfLeadingBallPositions[i][0]].status = statuses.empty;}
            catch{}
        }

        if (direction === directions.up) leadingBall.y--;
        else if (direction === directions.right) leadingBall.x++;
        else if (direction === directions.down) leadingBall.y++;
        else if (direction === directions.left) leadingBall.x--;
        

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
}

setInterval(() => {
    if (gameState === 1)document.getElementById("length").innerHTML = `Length: ${snakeLength}`;
    if (gameState === 2) document.getElementById("length").innerHTML = `Length: ${snakeLength}, press r to restart`;
}, 150)
