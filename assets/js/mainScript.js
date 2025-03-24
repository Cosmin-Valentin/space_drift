import { changeShip } from './shipSelect.js'
import { moveShip } from './shipDodge.js'
import { spawnObstacle } from './obstacleScript.js'
import { updatePrompt } from './promptScript.js'
import { levelPrompts } from './helperFunctions/levelPrompts.js'

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
let level = 0

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
  updatePrompt(gamePrompt, levelPrompts[level])
  setTimeout(() => {
    spawnObstacle(gameWrapper, shipWrapper, path, level, handleGameEnd)
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

async function handleGameEnd(score) {
  if (score < 20) {
    await updatePrompt(
      gamePrompt,
      `Game over! Try collecting over 90 to progress.`
    )
    reStartButton.style.animation =
      '0.8s linear 0s infinite normal none running flicker'
  } else {
    await updatePrompt(gamePrompt, `Level Over! Congrats!`)
    level++
    init()
  }
}

function removePressedClass() {
  document
    .querySelectorAll('.bottom-dashboard')
    .forEach((el) => el.classList.remove('pressed'))
}
