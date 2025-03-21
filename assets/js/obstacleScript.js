const scoreElement = document.querySelector('.top-left-banner span')
let obstacleSpeed = 10
let currentObstacle = null
let score = 0
let obstacleCount = 0
const maxObstacle = 100

export function spawnObstacle(gameWrapper, shipWrapper, path, onGameEnd) {
  if (currentObstacle) return

  if (obstacleCount >= maxObstacle) {
    onGameEnd(score)
    return
  }

  obstacleCount++
  if (obstacleCount % 5 === 0) obstacleSpeed += 1

  const obstacle = document.createElement('div')
  obstacle.classList.add('obstacle')

  const gameWidth = gameWrapper.clientWidth
  const minLeft = 120
  const maxLeft = gameWidth - 120
  const randomLeft = Math.floor(Math.random() * (maxLeft - minLeft) + minLeft)

  obstacle.style.left = `${randomLeft}px`
  obstacle.style.top = '0px'

  path.appendChild(obstacle)
  currentObstacle = obstacle
  moveObstacle(obstacle, gameWrapper, shipWrapper, path, onGameEnd)
}

function moveObstacle(obstacle, gameWrapper, shipWrapper, path, onGameEnd) {
  let obstacleInterval = setInterval(() => {
    let currentTop = parseInt(obstacle.style.top)

    if (currentTop >= gameWrapper.clientHeight) {
      obstacle.remove()
      clearInterval(obstacleInterval)
      currentObstacle = null
      setTimeout(spawnObstacle(gameWrapper, shipWrapper, path, onGameEnd), 500)
    } else {
      obstacle.style.top = `${currentTop + obstacleSpeed}px`

      if (checkCollision(obstacle, shipWrapper)) {
        score++
        scoreElement.innerText = score
        obstacle.remove()
        clearInterval(obstacleInterval)
        currentObstacle = null
        setTimeout(
          spawnObstacle(gameWrapper, shipWrapper, path, onGameEnd),
          500
        )
      }
    }
  }, 50)
}

function checkCollision(obstacle, ship) {
  const obsRect = obstacle.getBoundingClientRect()
  const shipRect = ship.getBoundingClientRect()

  return !(
    obsRect.top > shipRect.bottom ||
    obsRect.bottom < shipRect.top ||
    obsRect.right < shipRect.left ||
    obsRect.left > shipRect.right
  )
}
