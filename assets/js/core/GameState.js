import { generateRandomSet } from '../helper/generateRandomSet.js'

export class GameState {
  constructor(gameWrapper, shipWrapper, path, level, onGameEnd, maxObstacle) {
    this.gameWrapper = gameWrapper
    this.shipWrapper = shipWrapper
    this.path = path
    this.level = level
    this.onGameEnd = onGameEnd
    this.maxObstacle = maxObstacle
    this.obstacleCount = 0
    this.obstacleSpeed = 10
    this.score = 0
    this.hits = 0
    this.meteorites = generateRandomSet(maxObstacle / 10, maxObstacle)
    this.asteroids = generateRandomSet(maxObstacle / 10, maxObstacle)
    this.scoreElement = document.querySelector('.top-left-banner span')

    this.scoreElement.innerText = this.score
  }
}
