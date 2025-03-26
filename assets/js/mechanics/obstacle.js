import { takeDamage } from '../ui/updateHealthbar.js'
import { generateFlash } from './generateFlash.js'

const healthBar = document.querySelector('.healthbar')
let currentObstacle = null
let isMeteorite = false
let gamePaused = false

export function spawnObstacle(game) {
  if (currentObstacle) return

  if (game.level > 0) {
    healthBar.style.display = 'block'
  }

  if (
    game.obstacleCount >=
    game.maxObstacle + (game.level > 0 ? game.meteorites.size : 0)
  ) {
    game.onGameEnd(game.score)
    return
  }

  const obstacle = document.createElement('div')

  if (game.level === 0 || !game.meteorites.has(game.obstacleCount)) {
    isMeteorite = false
    obstacle.classList.add('cookie')
  } else {
    isMeteorite = true
    obstacle.classList.add('meteorite')
  }

  game.obstacleCount++

  if ((game.obstacleCount - game.meteorites.size) % 5 === 0)
    game.obstacleSpeed += 1

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
      setTimeout(spawnObstacle(game), 500)
    } else {
      obstacle.style.top = `${currentTop + game.obstacleSpeed}px`

      if (checkCollision(obstacle, game.shipWrapper)) {
        if (isMeteorite) {
          gamePaused = true
          takeDamage(25)
          game.hits++
          if (game.hits === 4) {
            obstacle?.remove()
            await generateFlash(game.shipWrapper, true)
            clearInterval(obstacleInterval)
            game.onGameEnd(game.score)
            return
          } else {
            obstacle?.remove()
            await generateFlash(game.shipWrapper)
            gamePaused = false
          }
        } else {
          game.score++
          game.scoreElement.innerText = game.score
        }
        obstacle?.remove()
        clearInterval(obstacleInterval)
        currentObstacle = null
        setTimeout(spawnObstacle(game), 500)
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
