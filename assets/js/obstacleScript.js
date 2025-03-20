const obstacleSpeed = 10
const scoreElement = document.querySelector('.top-left-banner span')
let currentObstacle = null
let score = 0

export function spawnObstacle(gameWrapper, shipWrapper, path) {
  if (currentObstacle) return

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
  moveObstacle(obstacle, gameWrapper, shipWrapper, path)
}

function moveObstacle(obstacle, gameWrapper, shipWrapper, path) {
  let obstacleInterval = setInterval(() => {
    let currentTop = parseInt(obstacle.style.top)
    if (currentTop >= gameWrapper.clientHeight) {
      obstacle.remove()
      clearInterval(obstacleInterval)
      currentObstacle = null
      setTimeout(spawnObstacle(gameWrapper, shipWrapper, path), 500)
    } else {
      obstacle.style.top = `${currentTop + obstacleSpeed}px`

      if (checkCollision(obstacle, shipWrapper)) {
        score++
        scoreElement.innerText = score
        obstacle.remove()
        clearInterval(obstacleInterval)
        currentObstacle = null
        setTimeout(spawnObstacle(gameWrapper, shipWrapper, path), 500)
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
