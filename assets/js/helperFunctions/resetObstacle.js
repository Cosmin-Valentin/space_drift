import { generateRandomSet } from './generateRandomSet.js'

const scoreElement = document.querySelector('.top-left-banner span')

export function resetObstacle(maxObstacle) {
  let obstacleCount = 0
  let obstacleSpeed = 10
  let score = 0
  let hits = 0
  let meteorites = generateRandomSet(maxObstacle / 10, maxObstacle)

  scoreElement.innerText = score

  return {
    obstacleCount,
    obstacleSpeed,
    score,
    hits,
    meteorites,
    maxObstacle,
    scoreElement
  }
}
