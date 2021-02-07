document.addEventListener('DOMContentLoaded' , () => {
    const bird = document.querySelector('.bird')
    const gameDisplay = document.querySelector('.game-container')
    const ground = document.querySelector('.ground')


    let birdLeft = 220
    let birdBottom = 100
    let gravity = 2
    let isGameOver = false
    let gap = 420
    let dinginterval = 3000
    let bonked = false

    function startGame() {
        birdBottom -= gravity
        bird.style.bottom = birdBottom + 'px'
        bird.style.left = birdLeft + 'px'
    }
    let gametimerID = setInterval(startGame, 20)

    function control(e) {
        if (e.keyCode === 32) {
            jump()
        }
    }

    function jump() {
        if (birdBottom < 500) birdBottom += 50
        bird.style.bottom = birdBottom + 'px'
        console.log(birdBottom)
    }
    document.addEventListener('keydown', control)

    function playBonk() {
        if (!bonked) {
        var sound = new Audio("bonk.wav");
        sound.play();
        bonked = true;
        }
    }

    function playDing() {
        var sound = new Audio(""); /* i tried to make it ding every time you made it through a pipe but it was just annoying instead */
        sound.play();
    }

    function generateObstacle() {
        let obstacleLeft = 500
        let randomHeight = Math.random() * 60
        let obstacleBottom = randomHeight
        const obstacle = document.createElement('div')
        const topObstacle = document.createElement('div')
        if (!isGameOver) {
            obstacle.classList.add('obstacle')
            topObstacle.classList.add('topObstacle')
        }
        gameDisplay.appendChild(obstacle)
        gameDisplay.appendChild(topObstacle)
        obstacle.style.left = obstacleLeft + 'px'
        topObstacle.style.left = obstacleLeft + 'px'
        obstacle.style.bottom = obstacleBottom + 'px'
        topObstacle.style.bottom = obstacleBottom + gap + 'px'

        function moveObstacle() {
            obstacleLeft -=2
            topObstacleLeft = obstacleLeft
            obstacle.style.left = obstacleLeft + 'px'
            topObstacle.style.left = obstacle.style.left

            if (obstacleLeft === -65) {
                clearInterval(gametimerId)
                gameDisplay.removeChild(obstacle)
            }

            if (
                obstacleLeft > 200 && obstacleLeft < 280 && birdLeft === 220 && 
                (birdBottom < obstacleBottom + 151.5 || birdBottom > obstacleBottom + gap -198.2)||
                birdBottom === 0
                ) {
                    gameOver()
                    clearInterval(gametimerId)
                }

            if (
                obstacleLeft > 200 && obstacleLeft < 280 && birdLeft != 220
                ) {
                    playDing()
                }

        }
        let gametimerId = setInterval(moveObstacle, 20)
        if (!isGameOver) setTimeout(generateObstacle, 3000)
    }
    generateObstacle()

    function scoreDing() {
        if (!isGameOver) { 
            setInterval(playDing, dinginterval);
        }
        if (isGameOver == true) {
            clearInterval(playDing);
        }

    }

    scoreDing()

    function gameOver() {
        clearInterval(gametimerID)
        isGameOver = true
        document.removeEventListener('keydown', control)
        playBonk()
        
    }    
    

})