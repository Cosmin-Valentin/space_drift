import { resetHealth, takeDamage } from '../ui/updateHealthbar.js'
import { damageFlash } from './damageFlash.js'
import { bonusItemAnimation } from './bonusItemAnimation.js'
import { shipImage } from '../main.js'

const healthBar = document.querySelector('.healthbar')
let activeObstacles = []
let gamePaused = false
let spawning = true

export function spawnWonderland(game, restart = false) {
  if (restart) {
    activeObstacles.forEach((obstacle) => obstacle.remove())
    activeObstacles = []
    gamePaused = false
    spawning = true
    shipImage.style.removeProperty('width')
    shipImage.style.removeProperty('height')
  }

  if (game.obstacleCount === 0) {
    resetHealth(100)
  }
  healthBar.style.display = 'block'

  function spawnSingleObstacle() {
    if (!spawning || activeObstacles.length >= 3) return

    const obstacle = document.createElement('div')

    if (
      game.obstacleCount - (game.lastAsteroidSpawn || 0) >= 10 &&
      Math.random() * 5 < 1
    ) {
      obstacle.classList.add('asteroid')
      game.lastAsteroidSpawn = game.obstacleCount
    } else if (
      game.obstacleCount - (game.lastResizeSpawn || 0) >= 30 &&
      Math.random() * 5 < 1
    ) {
      obstacle.classList.add(Math.random() < 0.5 ? 'eat-me' : 'drink-me')
      game.lastResizeSpawn = game.obstacleCount
    } else if (
      game.obstacleCount - (game.lastReduceTimeSpawn || 0) >= 20 &&
      Math.random() * 5 < 1
    ) {
      obstacle.classList.add('cookie')
      game.lastReduceTimeSpawn = game.obstacleCount
    } else {
      obstacle.classList.add('meteorite')
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
    if (!spawning) {
      if (game.hits >= 4) {
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
    const isEatMe = obstacle.classList.contains('eat-me')
    const isDrinkMe = obstacle.classList.contains('drink-me')
    const isCookie = obstacle.classList.contains('cookie')
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
        } else if (isCookie) {
          game.obstacleSpeed -= Math.random() < 0.5 ? 3 : 4
        } else if (isEatMe) {
          reSize(true)
        } else if (isDrinkMe) {
          reSize()
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
        } else if (isCookie || isEatMe || isDrinkMe) {
          obstacle?.remove()
          let bonusType = isCookie ? 'cookie' : isEatMe ? 'eat-me' : 'drink-me'
          await bonusItemAnimation(game.shipWrapper, bonusType)
          gamePaused = false
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

function reSize(isGrowing = false) {
  const computedStyle = getComputedStyle(shipImage)
  const currentWidthVh =
    (parseFloat(computedStyle.width) / window.innerHeight) * 100
  const currentHeightVh =
    (parseFloat(computedStyle.height) / window.innerHeight) * 100

  shipImage.style.width = `${currentWidthVh * (isGrowing ? 1.2 : 0.8)}vh`
  shipImage.style.height = `${currentHeightVh * (isGrowing ? 1.2 : 0.8)}vh`
}
