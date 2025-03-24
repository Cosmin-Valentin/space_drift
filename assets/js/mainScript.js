import { changeShip } from './shipSelect.js'
import { moveShip } from './shipDodge.js'
import { spawnObstacle } from './obstacleScript.js'
import { updatePrompt } from './promptScript.js'

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
  if (['Enter', ' '].includes(e.key) && !isGameStarted) startGame()
})

buttonLeft.addEventListener('pointerdown', (e) => handleTouch(e, 'left'))
buttonRight.addEventListener('pointerdown', (e) => handleTouch(e, 'right'))
startButton.addEventListener('pointerdown', (e) => startGame())

buttonLeft.addEventListener('pointerup', removePressedClass)
buttonRight.addEventListener('pointerup', removePressedClass)
buttonLeft.addEventListener('touchend', removePressedClass, { passive: true })
buttonRight.addEventListener('touchend', removePressedClass, { passive: true })
buttonLeft.addEventListener('touchcancel', removePressedClass)
buttonRight.addEventListener('touchcancel', removePressedClass)

reStartButton.addEventListener('pointerdown', (e) => {
  e.target.style.opacity = 0.5
  setTimeout(() => window.location.reload(), 200)
})

function init() {
  updatePrompt(
    gamePrompt,
    'Get most space <div class="target"></div> out of 100'
  )
  setTimeout(() => {
    spawnObstacle(gameWrapper, shipWrapper, path, handleGameEnd)
  }, 1000)
}

function handleDirection(direction) {
  isProcessing = true
  document
    .querySelector(`.bottom-dashboard.bottom-${direction}`)
    .classList.add('pressed')

  isGameStarted && moveShip(direction, shipImage, shipWrapper)
  !isGameStarted && changeShip(direction, shipImage, shipWrapper)

  setTimeout(() => {
    isProcessing = false
    removePressedClass()
  }, eventDuration)
  return direction
}

function handleTouch(e, direction) {
  if (!isProcessing) {
    handleDirection(direction)
  }
  e.preventDefault()
}

function startGame() {
  startButton.style.opacity = 0.5
  setTimeout(() => {
    shipWrapper.style.transition = 'bottom 1s ease-in'
    shipWrapper.classList.remove('choose-ship')
    startButton.style.display = 'none'
    reStartButton.style.display = 'flex'
    isGameStarted = true
    init()
  }, 200)
}

function handleGameEnd(score) {
  updatePrompt(gamePrompt, `Level Over! Your score: ${score}`)
}

function removePressedClass() {
  document
    .querySelectorAll('.bottom-dashboard')
    .forEach((el) => el.classList.remove('pressed'))
}
