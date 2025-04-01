import {
  handleDirection,
  startGame,
  handleTouch,
  removePressedClass,
  startButton,
  reStartButton,
  isProcessing,
  isGameStarted,
  level
} from '../main.js'

import { startMoving, stopMoving } from '../helper/moveShip.js'

let keydownListener
let leftButtonListener
let rightButtonListener
let startButtonListener
let restartListener

const buttonLeft = document.querySelector('.bottom-dashboard.bottom-left')
const buttonRight = document.querySelector('.bottom-dashboard.bottom-right')

const leftMouseDown = () => startMoving('left')
const rightMouseDown = () => startMoving('right')
const leftTouchStart = () => startMoving('left')
const rightTouchStart = () => startMoving('right')

export function initializeEventListeners(invertControls = false) {
  if (keydownListener) document.removeEventListener('keydown', keydownListener)
  if (leftButtonListener)
    buttonLeft.removeEventListener('click', leftButtonListener)
  if (rightButtonListener)
    buttonRight.removeEventListener('click', rightButtonListener)
  if (startButtonListener)
    startButton.removeEventListener('click', startButtonListener)
  if (restartListener)
    reStartButton.removeEventListener('click', restartListener)

  document.removeEventListener('keyup', stopMoving)
  buttonLeft.removeEventListener('mousedown', leftMouseDown)
  buttonRight.removeEventListener('mousedown', rightMouseDown)
  buttonLeft.removeEventListener('mouseup', stopMoving)
  buttonRight.removeEventListener('mouseup', stopMoving)
  buttonLeft.removeEventListener('touchstart', leftTouchStart)
  buttonRight.removeEventListener('touchstart', rightTouchStart)
  buttonLeft.removeEventListener('touchend', stopMoving)
  buttonRight.removeEventListener('touchend', stopMoving)

  keydownListener = (e) => {
    if (isProcessing) return

    const leftKeys = invertControls ? ['d', 'ArrowRight'] : ['a', 'ArrowLeft']
    const rightKeys = invertControls ? ['a', 'ArrowLeft'] : ['d', 'ArrowRight']

    if (level >= 3) {
      if (leftKeys.includes(e.key)) startMoving('left')
      if (rightKeys.includes(e.key)) startMoving('right')
    } else {
      if (leftKeys.includes(e.key)) handleDirection('left')
      if (rightKeys.includes(e.key)) handleDirection('right')
    }
    if (['Enter', ' '].includes(e.key) && !isGameStarted) startGame()
  }

  leftButtonListener = (e) => {
    if (level < 3) {
      handleTouch(e, invertControls ? 'right' : 'left')
      removePressedClass()
    }
  }
  rightButtonListener = (e) => {
    if (level < 3) {
      handleTouch(e, invertControls ? 'left' : 'right')
      removePressedClass()
    }
  }

  startButtonListener = () => startGame()
  restartListener = (e) => {
    e.target.style.opacity = 0.5
    setTimeout(() => window.location.reload(), 200)
  }

  document.addEventListener('keyup', stopMoving)
  document.addEventListener('keydown', keydownListener)
  buttonLeft.addEventListener('click', leftButtonListener)
  buttonRight.addEventListener('click', rightButtonListener)
  startButton.addEventListener('click', startButtonListener)
  reStartButton.addEventListener('click', restartListener)

  if (level >= 3) {
    buttonLeft.addEventListener('mousedown', leftMouseDown)
    buttonRight.addEventListener('mousedown', rightMouseDown)
    buttonLeft.addEventListener('mouseup', stopMoving)
    buttonRight.addEventListener('mouseup', stopMoving)

    buttonLeft.addEventListener('touchstart', leftTouchStart)
    buttonRight.addEventListener('touchstart', rightTouchStart)
    buttonLeft.addEventListener('touchend', stopMoving)
    buttonRight.addEventListener('touchend', stopMoving)
  }
}
