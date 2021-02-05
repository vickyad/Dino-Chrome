const dino = document.getElementById('dino')
const grid = document.getElementById('grid')
const botao = document.getElementById('start_game_button')

let isJumping = false
let isGameOver = true
let speed = 0.9

function control() {
    if(!isGameOver){
        if(!isJumping) {
            isJumping = true
            jump()
        }
    }
}

botao.addEventListener('click', startGame)

function startGame() {
    isGameOver = false
    document.addEventListener('click', control)
    generateObstacles()
}

let position = 0
function jump() {
    let count = 0
    let timerId = setInterval(() => {
        if(count === 15) {
            // move down
            clearInterval(timerId)
            
            let downTimerId = setInterval(() => {
                if(count === 0) {
                    clearInterval(downTimerId)
                    isJumping = false
                }
                count --
                position = (position - 5) * speed
                dino.style.bottom = `${position}px`
                
            }, 20)
        }
        //move up
        count ++
        position = (position + 30) * speed
        dino.style.bottom = `${position}px`
    }, 20)
}

function generateObstacles() {
    let randomTime = Math.random() * 4000
    let obstaclePosition = 1000
    const obstacle = document.createElement('div')

    if (!isGameOver) {
        obstacle.classList.add('obstacle')
        obstacle.style.left = `${obstaclePosition}px`
        grid.appendChild(obstacle)
    }

    let timerId = setInterval(() => {
        if (obstaclePosition > 0 && obstaclePosition < 60 && position < 60) {
            clearInterval(timerId)
            console.log('Game Over')
            isGameOver = true

            while(grid.firstChild) {
                grid.removeChild(grid.lastChild)
            }
        }

        obstaclePosition -= 10
        obstacle.style.left = `${obstaclePosition}px`
    }, 25)

    setTimeout(generateObstacles, randomTime)
}