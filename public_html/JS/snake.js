let snake;
let snakeLength;
let snakeSize;
let food;
let context;
let screenWidth;
let screenHeight;

gameInit();
snakeInit();
foodInit();
setInterval(gameLoop, 150);

function gameInit() {
    let canvas = document.getElementById("screen-view");
    
    context = canvas.getContext("2d");
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;
    canvas.width = screenWidth;
    canvas.height = screenHeight;
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

function snakeInit() {
    snake = [];
    snakeLength = 5;
    snakeSize = 15;
    
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
    snakeHeadX++;
    
    let snakeTail = snake.pop();
    snakeTail.x = snakeHeadX;
    snakeTail.y = snakeHeadY;
    snake.unshift(snakeTail);
}

function foodInit() {
    food = {
        x: 0,
        y: 0
    };
}

function foodDraw() {
    context.fillStyle = "white";
    context.fillRect(food.x, food.y, snakeSize, snakeSize);
}