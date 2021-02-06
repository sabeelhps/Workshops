const canvas = document.getElementById('canvas');
const pen = canvas.getContext('2d');
const H = 735;
const W = 1200;
const cs = 67;
pen.fillStyle = 'red';
let food;
let score = 0;


const snake = {

    init_len: 5,
    direction: 'right',
    cells: [],
    
    createSnake: function () {
        
        for (let i = 0; i <=this.init_len; i++){
            this.cells.push({
                x: i,
                y:0
            })
        }
    },

    drawSnake: function () {
        
        for (let i = 0; i < this.cells.length - 1; i++){
            let cell = this.cells[i];
            pen.fillRect(cell.x*cs, cell.y*cs, cs-2, cs-2);
        }

    },

    updateSnake: function () {


        const headX = this.cells[this.cells.length - 1].x;
        const headY = this.cells[this.cells.length - 1].y;

        if (food.x == headX && food.y == headY) {
            console.log("Food eaten");
            food = getRandomFood();
            score++;
        } else {
            this.cells.shift();
        }

    

        let nextX, nextY;

        if (this.direction == 'right') {
            nextX = headX + 1;
            nextY = headY;

            // stoping condition
            if (nextX * cs - cs >= W) {
                clearInterval(id);
                pen.fillText('Game Over', 50, 100);
            }

        }
        else if (this.direction == 'left') {
            nextX = headX - 1;
            nextY = headY;
        }
        else if (this.direction == 'up') {
            nextX = headX ;
            nextY = headY - 1;
        }
        else {
            nextX = headX ;
            nextY = headY + 1;
        }
      

        this.cells.push({
            x: nextX,
            y:nextY
        })

    }
}




// init function
function init() {
   
    snake.createSnake();
    snake.drawSnake();

    food = getRandomFood();


    function keyPressed(event) {
       
        if (event.key == 'ArrowLeft') {
            snake.direction = 'left';
        }
        else if (event.key == 'ArrowRight') {
            snake.direction = 'right';
        }
        else if (event.key == 'ArrowUp') {
            snake.direction = 'up';
        }
        else {
            snake.direction = 'down';
        }

        console.log(snake.direction);

    }

    document.addEventListener('keydown', keyPressed);
}
// draw

function draw() {
    pen.clearRect(0, 0, W, H);
    pen.fillStyle = 'red';
    snake.drawSnake();

    pen.fillStyle = 'blue';
    pen.fillRect(food.x * cs, food.y * cs, cs, cs);
    pen.font = '40px Roboto';
    pen.fillText(`Score: ${score}`, 50, 50);
}

// update


function update() {
    
    snake.updateSnake();

}

// Game loop
function gameLoop() {
    draw();
    update();

}

function getRandomFood() {
    
    const foodx = Math.round((Math.random() * (W - cs) / cs));
    const foody = Math.round((Math.random() * (H - cs) / cs));

    const food = {
        x: foodx,
        y: foody
    }


    return food;
}

init();

const id=setInterval(gameLoop, 100);

