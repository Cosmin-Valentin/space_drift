import { changeShip } from './shipSelect.js'
import { moveShip } from './shipDodge.js'
import { spawnObstacle } from './obstacleScript.js'

const startButton = document.querySelector('.top-right-start-banner')
const reStartButton = document.querySelector('.top-right-restart-banner')
const buttonLeft = document.querySelector('.bottom-dashboard.bottom-left')
const buttonRight = document.querySelector('.bottom-dashboard.bottom-right')
const gameWrapper = document.querySelector('.game-wrapper')
const gamePrompt = document.querySelector('.game-prompt')
const path = document.querySelector('.path')
const shipWrapper = document.querySelector('.ship-wrapper')
const shipImage = document.querySelector('.ship img')
let isProcessing = false
let isGameStarted = false
const eventDuration = 100

document.addEventListener('keydown', (e) => {
  if (isProcessing) return
  if (['a', 'ArrowLeft'].includes(e.key)) handleDirection('left')
  if (['d', 'ArrowRight'].includes(e.key)) handleDirection('right')
})

buttonLeft.addEventListener('pointerdown', (e) => {
  handleTouch(e, 'left')
})
buttonRight.addEventListener('pointerdown', (e) => {
  handleTouch(e, 'right')
})

reStartButton.addEventListener('pointerdown', (e) => {
  e.target.style.opacity = 0.5
  setTimeout(() => window.location.reload(), 200)
})

startButton.addEventListener('pointerdown', (e) => {
  e.target.style.opacity = 0.5
  setTimeout(() => {
    shipWrapper.style.transition = 'bottom 1s ease-in'
    gamePrompt.style.display = 'none'
    shipWrapper.classList.remove('choose-ship')
    startButton.style.display = 'none'
    reStartButton.style.display = 'flex'
    isGameStarted = true
    init()
  }, 200)
})

function handleDirection(direction) {
  isProcessing = true
  document
    .querySelector(`.bottom-dashboard.bottom-${direction}`)
    .classList.add('pressed')

  isGameStarted && moveShip(direction, shipImage, shipWrapper)
  !isGameStarted && changeShip(direction, shipImage, shipWrapper)

  setTimeout(() => {
    isProcessing = false
    document
      .querySelectorAll('.bottom-dashboard')
      .forEach((el) => el.classList.remove('pressed'))
  }, eventDuration)
  return direction
}

function handleTouch(e, direction) {
  if (!isProcessing) {
    handleDirection(direction)
  }
  e.preventDefault()
}

function init() {
  spawnObstacle(gameWrapper, shipWrapper, path)
}
