const canvas = document.getElementById('canvas');
const pen = canvas.getContext('2d');
const W = 1200;
const H = 735;
const cs = 67;
pen.fillStyle = 'red';
let food;
let score = 0;


const snake = {
    
    init_len: 5,
    direction: 'right',
    cells: [],

    createSnake: function () {
        
        for (let i = 0; i < this.init_len; i++){
            this.cells.push({
                x: i,
                y: 0
            })
        }

    },

    drawSnake: function () {
        
        for (let i = 0; i < this.cells.length; i++){
            let cell = this.cells[i];

            pen.fillRect(cell.x*cs, cell.y*cs, cs-2, cs-2);

        }
    },

    updateSnake() {
        
        const headX = this.cells[this.cells.length - 1].x;
        const headY = this.cells[this.cells.length - 1].y;

        let nextX, nextY;

        if (food.x == headX && food.y == headY) {
            food = getRandomFood();
            score++;
        }
        else {
            this.cells.shift();
        }

        if (this.direction == 'up') {
            nextX = headX;
            nextY = headY-1;
        }
        else if (this.direction == 'down') {
            nextX = headX;
            nextY = headY+1;
        }
        else if (this.direction == 'left') {
            nextX = headX-1;
            nextY = headY;
        }
        else {  
            nextX = headX + 1;
            nextY = headY;

            if (nextX * cs >= W) {
                pen.fillText('Game Over', 50, 100);
                clearInterval(id);
            }

        }



       


        this.cells.push({
            x: nextX,
            y: nextY
        })

    }


}



// initilisation

function init() {
    
    snake.createSnake();
    snake.drawSnake();

    food = getRandomFood();

    function keyPressed(event) {
        
        if (event.key == 'ArrowRight') {
            snake.direction = 'right';
        }
        else if (event.key == 'ArrowUp') {
            snake.direction = 'up';
        }
        else if (event.key == 'ArrowDown') {
            snake.direction = 'down';
        }
        else {
            snake.direction = 'left';
        }

        console.log(snake.direction);


    }

    document.addEventListener('keydown', keyPressed);

}


// draw

function draw() {
    
    pen.clearRect(0, 0, W, H);
    pen.font = '40px Roboto';
    pen.fillText(`Score ${score}`, 50, 50);
    pen.fillStyle='blue';
    pen.fillRect(food.x * cs, food.y * cs, cs, cs);
    pen.fillStyle = 'red';
    snake.drawSnake();

}

// update

function update() {
    snake.updateSnake();
}

// gameloop

function gameLoop() {
   
    draw();
    update();
}

function getRandomFood() {
    
    const foodX = Math.round(Math.random() * (W - cs) / cs);
    const foodY = Math.round(Math.random() * (H - cs) / cs);

    const food = {
        x: foodX,
        y:foodY
    }

    return food;
}

init();

const id = setInterval(gameLoop, 100);
