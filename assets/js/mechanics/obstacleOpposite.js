import { healthSparkle } from './healthSparkle.js'
import { generateRandomSet } from '../helper/generateRandomSet.js'
import { resetHealth, increaseHealth } from '../ui/updateHealthbar.js'

const healthBar = document.querySelector('.healthbar')
let currentObstacle = null
let isMeteorite = false
let gamePaused = false
let score = null
let targetScore = null
let meteorites = null

export function spawnObstacleOpposite(game, restart = false) {
  if (restart) {
    score = null
    currentObstacle = null
    gamePaused = false
  }

  if (currentObstacle) return

  if (game.obstacleCount === 0) {
    resetHealth(0)
    healthBar.style.display = 'block'
  }

  if (score === null) {
    score = game.maxObstacle === 60 ? 100 : game.maxObstacle === 100 ? 60 : 80
    game.scoreElement.innerText = score

    meteorites = generateRandomSet(score / 5, score)
    targetScore = Math.round(score * 0.9)
  }

  if (score === 0) {
    game.onGameEnd(targetScore, true)
    return
  }

  const obstacle = document.createElement('div')

  if (!meteorites.has(game.obstacleCount)) {
    isMeteorite = false
    obstacle.classList.add('cookie')
  } else {
    isMeteorite = true
    obstacle.classList.add('meteorite')
  }

  game.obstacleCount++

  if ((game.obstacleCount - meteorites.size) % 5 === 0) game.obstacleSpeed += 1

  const gameWidth = game.gameWrapper.clientWidth
  const minLeft = 120
  const maxLeft = gameWidth - 120
  const randomLeft = Math.floor(Math.random() * (maxLeft - minLeft) + minLeft)

  obstacle.style.left = `${randomLeft}px`
  obstacle.style.top = '0px'

  game.path.appendChild(obstacle)
  currentObstacle = obstacle
  moveObstacle(obstacle, game)
}

function moveObstacle(obstacle, game) {
  let obstacleInterval = setInterval(async () => {
    if (gamePaused) return

    let currentTop = parseInt(obstacle.style.top)

    if (currentTop >= game.gameWrapper.clientHeight) {
      obstacle?.remove()
      clearInterval(obstacleInterval)
      currentObstacle = null
      setTimeout(spawnObstacleOpposite(game), 500)
    } else {
      obstacle.style.top = `${currentTop + game.obstacleSpeed}px`

      if (checkCollision(obstacle, game.shipWrapper)) {
        if (isMeteorite) {
          gamePaused = true
          increaseHealth(25)
          game.hits++
          if (game.hits === 4) {
            obstacle?.remove()
            await healthSparkle(game.shipWrapper, true)
            clearInterval(obstacleInterval)
            if (score < targetScore) {
              game.onGameEnd(targetScore, true)
            } else {
              game.onGameEnd(score)
            }
            return
          } else {
            obstacle?.remove()
            await healthSparkle(game.shipWrapper)
            gamePaused = false
          }
        } else {
          game.shipWrapper
            .querySelector('.ship-img')
            .classList.toggle('not-edible')
          setTimeout(() => {
            game.shipWrapper
              .querySelector('.ship-img')
              .classList.toggle('not-edible')
          }, 500)
          game.scoreElement.innerText = --score
        }
        obstacle?.remove()
        clearInterval(obstacleInterval)
        currentObstacle = null
        setTimeout(spawnObstacleOpposite(game), 500)
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
