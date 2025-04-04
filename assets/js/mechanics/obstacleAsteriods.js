import { resetHealth, takeDamage } from '../ui/updateHealthbar.js'
import { damageFlash } from './damageFlash.js'

const healthBar = document.querySelector('.healthbar')
let activeObstacles = []
let gamePaused = false
let spawning = true
let isAsteroid = false

export function spawnAsteroids(game, restart = false) {
  if (restart) {
    activeObstacles.forEach((obstacle) => obstacle.remove())
    activeObstacles = []
    gamePaused = false
    spawning = true
  }

  if (game.obstacleCount === 0) {
    resetHealth(100)
  }
  healthBar.style.display = 'block'

  function spawnSingleObstacle() {
    if (!spawning || activeObstacles.length >= 3) return

    const obstacle = document.createElement('div')

    if (!game.asteroids.has(game.obstacleCount)) {
      obstacle.classList.add('meteorite')
    } else {
      obstacle.classList.add('asteroid')
    }

    if (++game.obstacleCount % 5 === 0) game.obstacleSpeed += 1

    const gameWidth = game.gameWrapper.clientWidth
    const minLeft = 120
    const maxLeft = gameWidth - 120
    const randomLeft = Math.floor(Math.random() * (maxLeft - minLeft) + minLeft)

    obstacle.style.left = `${randomLeft}px`
    obstacle.style.top = '0px'

    game.path.appendChild(obstacle)
    activeObstacles.push(obstacle)
    moveObstacle(obstacle, game)
  }

  function spawnLoop() {
    if (!spawning || game.obstacleCount >= game.maxObstacle) {
      if (game.hits >= 4) {
        game.onGameEnd(game.maxObstacle - 4, true)
      } else {
        game.onGameEnd(game.score)
      }
      game.shipWrapper.style.left = '50%'
      return
    }

    const numObstacles = Math.floor(Math.random() * 3) + 1
    for (let i = 0; i < numObstacles; i++) {
      setTimeout(spawnSingleObstacle, Math.random() * 2000)
    }

    setTimeout(spawnLoop, Math.random() * 3000 + 1000)
  }

  spawnLoop()
}

function moveObstacle(obstacle, game) {
  let obstacleInterval = setInterval(async () => {
    if (gamePaused) return

    let currentTop = parseInt(obstacle.style.top)
    const isAsteroid = obstacle.classList.contains('asteroid')
    const speed = isAsteroid ? 8 : game.obstacleSpeed

    if (currentTop >= game.gameWrapper.clientHeight) {
      obstacle?.remove()
      clearInterval(obstacleInterval)
      activeObstacles = activeObstacles.filter((o) => o !== obstacle)
      game.scoreElement.innerText = ++game.score
    } else {
      obstacle.style.top = `${currentTop + speed}px`

      if (checkCollision(obstacle, game.shipWrapper)) {
        gamePaused = true
        if (isAsteroid) {
          takeDamage(50)
          game.hits += 2
        } else {
          takeDamage(25)
          game.hits++
        }
        if (game.hits >= 4) {
          spawning = false
          activeObstacles.forEach((o) => o.remove())
          activeObstacles = []
          obstacle?.remove()
          await damageFlash(game.shipWrapper, true)
          clearInterval(obstacleInterval)
          return
        } else {
          obstacle?.remove()
          await damageFlash(game.shipWrapper)
          gamePaused = false
        }
        clearInterval(obstacleInterval)
        activeObstacles = activeObstacles.filter((o) => o !== obstacle)
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
