/*
 * ######################Vars Declaration#############################
 */

let snake;
let snakeLength;
let snakeSize;
let snakeDirection;
let food;
let context;
let screenWidth;
let screenHeight;

/*
 * #####################Executing Functions###########################
 */

gameInit();
snakeInit();
foodInit();
setInterval(gameLoop, 100);

/*
 * #####################Game Functions################################
 */

function gameInit() {
    let canvas = document.getElementById("screen-view");
    
    context = canvas.getContext("2d");
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;
    canvas.width = screenWidth;
    canvas.height = screenHeight;
    
    document.addEventListener("keydown", keyHandler);
}

function gameLoop() {
    gameDraw();
    snakeMove();
    snakeDraw();
    foodDraw();
}

function gameDraw() {
    context.fillStyle = "rgb(56, 54, 69)";
    context.fillRect(0, 0, screenWidth, screenHeight);   
}

/*
 * #####################Snake Functions###############################
 */

function snakeInit() {
    snake = [];
    snakeLength = 5;
    snakeSize = 15;
    snakeDirection = "down";
    
    for (let i = snakeLength - 1; i >= 0; i--) {
        snake.push({
            x: i,
            y: 0
        });
    }
}

function snakeDraw() {
    for (let i = 0; i < snake.length; i++) {
        context.fillStyle = "white";
        context.fillRect(snake[i].x * snakeSize, snake[i].y * snakeSize, snakeSize, snakeSize);
    }    
}

function snakeMove() {
    let snakeHeadX = snake[0].x;
    let snakeHeadY = snake[0].y; 
    
    if (snakeDirection == "down") {
        snakeHeadY++;
    } else if (snakeDirection == "right") {
        snakeHeadX++;
    } else if (snakeDirection == "up") {
        snakeHeadY--;
    } else if (snakeDirection == "left") {
        snakeHeadX--;
    }
    
    let snakeTail = snake.pop();
    snakeTail.x = snakeHeadX;
    snakeTail.y = snakeHeadY;
    snake.unshift(snakeTail);
}

/*
 * ######################Food Functions###############################
 */

function foodInit() {
    food = {
        x: 0,
        y: 0
    };
    setFoodPos();
}

function foodDraw() {
    context.fillStyle = "white";
    context.fillRect(food.x * snakeSize, food.y * snakeSize, snakeSize, snakeSize);
}

function setFoodPos() {
    let randXPos = Math.floor(Math.random() * screenWidth);
    let randYPos = Math.floor(Math.random() * screenHeight);
    food.x = Math.floor(randXPos / snakeSize); /* Dividing by the snake size gives our food the correct..*/
    food.y = Math.floor(randYPos / snakeSize); /* ..positioning in the world.*/
}

/*
 * #######################Key Handling Functions###############################
 */

function keyHandler(event) {
    console.log(event);
    
    if (event.keyCode == "68" && snakeDirection != "left") {
        snakeDirection = "right";
    } else if (event.keyCode == "87" && snakeDirection != "down") {
        snakeDirection = "up";
    } else if (event.keyCode == "65" && snakeDirection != "right") {
        snakeDirection = "left";
    } else if (event.keyCode == "83" && snakeDirection != "up") {
        snakeDirection = "down";
    }
}