const width = 28
const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('#score')
let squares = []
let score = 0
// 0 - pac-dots
// 1 - wall
// 2 - ghost-lair
// 3 - power-pellet
// 4 - empty
const layout = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 3, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 3, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 2, 2, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    4, 4, 4, 4, 4, 4, 0, 0, 0, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 0, 0, 0, 4, 4, 4, 4, 4, 4,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 3, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 3, 1,
    1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1,
    1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
]

function createBoard() {
    for (var i = 0; i < layout.length; i++) {
        const square = document.createElement('div')
        grid.appendChild(square)
        squares.push(square)
        if (layout[i] === 0) {
            squares[i].classList.add('pac-dot')
        } else if (layout[i] === 1) {
            squares[i].classList.add('wall')
        } else if (layout[i] === 2) {
            squares[i].classList.add('ghost-lair')
        } else if (layout[i] === 3) {
            squares[i].classList.add('power-pellet')
        } else if (layout[i] === 4) {
            squares[i].classList.add('empty')
        }

    }

}
createBoard()

//start position of pacman
let pacmanCurrent = 490
squares[pacmanCurrent].classList.add('pacman')

// down - 40
//up key - 38
// left - 37
// right - 39

function control(e) {
    squares[pacmanCurrent].classList.remove('pacman')
    //if (e.keyCode === 40) {
    // console.log('pressed down')
    //} else if (e.keyCode === 38) {
    //console.log('pressed up')
    //} else if (e.keyCode === 37) {
    // console.log('pressed left')
    // } else if (e.keyCode === 39) {
    //   console.log('pressed right')
    //}

    switch (e.keyCode) {
        case 40:

            if (
                !squares[pacmanCurrent + width].classList.contains('ghost-lair') &&
                !squares[pacmanCurrent + width].classList.contains('wall') &&
                pacmanCurrent + width < width * width) pacmanCurrent += width
            break
        case 38:

            if (
                !squares[pacmanCurrent - width].classList.contains('ghost-lair') &&
                !squares[pacmanCurrent - width].classList.contains('wall') &&
                pacmanCurrent - width > width / width)
                pacmanCurrent -= width
            break
        case 37:

            if (
                !squares[pacmanCurrent - 1].classList.contains('ghost-lair') &&
                !squares[pacmanCurrent - 1].classList.contains('wall') &&
                pacmanCurrent % width !== 0)
                pacmanCurrent -= 1
            if (pacmanCurrent === 364) {
                pacmanCurrent = 391
            }
            break
        case 39:

            if (
                !squares[pacmanCurrent + 1].classList.contains('ghost-lair') &&
                !squares[pacmanCurrent + 1].classList.contains('wall') &&
                pacmanCurrent % width !== 27)
                pacmanCurrent += 1
            if (pacmanCurrent === 391) { //move through otherside board
                pacmanCurrent = 364
            }
            break
    }
    squares[pacmanCurrent].classList.add('pacman')
    pacDotEaten()
    powerPelletEaten()
    checkWin()
    checkGameOver
}
document.addEventListener('keyup', control)

function pacDotEaten() {
    if (squares[pacmanCurrent].classList.contains('pac-dot')) {
        squares[pacmanCurrent].classList.remove('pac-dot')
        score++
        scoreDisplay.innerHTML = score

    }
}
function powerPelletEaten() {
    if (squares[pacmanCurrent].classList.contains('power-pellet')) {
        squares[pacmanCurrent].classList.remove('power-pellet')
        score += 10
        scoreDisplay.innerHTML = score
        ghosts.forEach(ghost => ghost.isScared = true)
        setTimeout(unScareGhosts, 10000)

    }
}
function unScareGhosts() {
    ghosts.forEach(ghost => ghost.isScared = false)
}

class Ghost {
    constructor(className, startIndex, speed) {
        this.className = className
        this.startIndex = startIndex
        this.speed = speed
        this.currentIndex = startIndex
        this.isScared = false
        this.timerId = NaN
    }
}
const ghosts = [
    new Ghost('blinky', 348, 250),
    new Ghost('pinky', 376, 400),
    new Ghost('inky', 351, 300),
    new Ghost('clyde', 379, 500),
]
//draw ghost
ghosts.forEach(ghost => {
    squares[ghost.currentIndex].classList.add(ghost.className)
    squares[ghost.currentIndex].classList.add('ghost')
})

ghosts.forEach(ghost => moveGhost(ghost))

function moveGhost(ghost) {
    const directions = [-1, +1, -width, +width]
    let direction = directions[Math.floor(Math.random() * directions.length)]

    ghost.timerId = setInterval(function () {
        if (

            !squares[ghost.currentIndex + direction].classList.contains('wall') &&
            !squares[ghost.currentIndex + direction].classList.contains('ghost')
        ) {
            squares[ghost.currentIndex].classList.remove(ghost.className)//remove any ghost
            squares[ghost.currentIndex].classList.remove('ghost', 'scared')
            //add direction to current Index
            ghost.currentIndex += direction
            //add ghost class
            squares[ghost.currentIndex].classList.add(ghost.className)
            squares[ghost.currentIndex].classList.add('ghost')
        } else direction = directions[Math.floor(Math.random() * directions.length)]

        //scared ghost
        if (ghost.isScared) {
            squares[ghost.currentIndex].classList.add('scared')
        }
        //if the ghost is current scared AND pacman is on it
        if (ghost.isScared && squares[ghost.currentIndex].classList.contains('pacman')) {


            //remove classnames - ghost.className, 'ghost', 'scared-ghost'
            squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared')

            //add a score of 100


            // change ghosts currentIndex back to its startIndex
            ghost.currentIndex = ghost.startIndex

            score += 100
            //re-add classnames of ghost.className and 'ghost' to the ghosts new postion
            squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')

        }
        checkGameOver()

    }, ghost.speed)
}

//gameover
function checkGameOver() {
    if (squares[pacmanCurrent].classList.contains('ghost') &&
        !squares[pacmanCurrent].classList.contains('scared')) {
        //for each ghost - we need to stop it moving
        ghosts.forEach(ghost => clearInterval(ghost.timerId))
        //remove eventlistener from our control function
        document.removeEventListener('keyup', control)
        //tell user the game is over
        scoreDisplay.innerHTML = 'Game Over 😞'
        scoreDisplay.style.fontsize = '165px'
        scoreDisplay.style.backgroundColor = 'red'
    }
}

function checkWin() {
    if (score === 274) {
        //stop each ghost
        ghosts.forEach(ghost => clearInterval(ghost.timerId))
        //remove the eventListener for the control function
        document.removeEventListener('keyup', control)
        //tell our user we have won
        scoreDisplay.innerHTML = 'WINNER! 🙌🎊'
        scoreDisplay.style.fontsize = '165px'
        scoreDisplay.style.backgroundColor = 'green'
    }
}