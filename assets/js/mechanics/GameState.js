export class GameState {
  constructor(gameWrapper, shipWrapper, path, level, onGameEnd, gameState) {
    this.gameWrapper = gameWrapper
    this.shipWrapper = shipWrapper
    this.path = path
    this.level = level
    this.onGameEnd = onGameEnd
    this.obstacleCount = gameState.obstacleCount
    this.obstacleSpeed = gameState.obstacleSpeed
    this.score = gameState.score
    this.hits = gameState.hits
    this.meteorites = gameState.meteorites
    this.maxObstacle = gameState.maxObstacle
    this.scoreElement = gameState.scoreElement
  }
}
