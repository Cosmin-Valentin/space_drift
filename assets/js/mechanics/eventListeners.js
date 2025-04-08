import {
  handleDirection,
  startGame,
  handleTouch,
  removePressedClass,
  startButton,
  menuButton,
  isProcessing,
  isGameStarted,
  getLevel,
  difficulty,
  maxObstacle
} from '../main.js'

import { startMoving, stopMoving } from '../helper/moveShip.js'

let keydownListener
let leftButtonListener
let rightButtonListener
let startButtonListener
let restartListener
let toggleMenuListener
let goToLevelListener

const buttonLeft = document.querySelector('.bottom-dashboard.bottom-left')
const buttonRight = document.querySelector('.bottom-dashboard.bottom-right')
const restartGameButton = document.querySelector(
  '.top-right-menu .restart-game'
)
const menuLevels = document.querySelectorAll(
  '.top-right-menu .dropdown-item[data-start-level]'
)

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
    restartGameButton.removeEventListener('click', restartListener)
  if (toggleMenuListener)
    menuButton.removeEventListener('click', toggleMenuListener)
  if (goToLevelListener)
    menuLevels.forEach((el) =>
      el.removeEventListener('click', goToLevelListener)
    )

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

    if (getLevel() >= 3) {
      if (leftKeys.includes(e.key)) startMoving('left')
      if (rightKeys.includes(e.key)) startMoving('right')
    } else {
      if (leftKeys.includes(e.key)) handleDirection('left')
      if (rightKeys.includes(e.key)) handleDirection('right')
    }
    if (['Enter', ' '].includes(e.key) && !isGameStarted) startGame()
  }

  leftButtonListener = (e) => {
    if (getLevel() < 3) {
      handleTouch(e, invertControls ? 'right' : 'left')
      removePressedClass()
    }
  }
  rightButtonListener = (e) => {
    if (getLevel() < 3) {
      handleTouch(e, invertControls ? 'left' : 'right')
      removePressedClass()
    }
  }

  startButtonListener = () => startGame()
  restartListener = (e) => {
    e.target.style.opacity = 0.5
    setTimeout(() => window.location.reload(), 200)
  }
  toggleMenuListener = (e) => {
    e.target.classList.toggle('open')
  }
  goToLevelListener = (e) => {
    let startLevel = e.target.dataset.startLevel
    const shipImg = document.querySelector('.ship-img')
    const shipSrc = shipImg.getAttribute('src')
    const match = shipSrc.match(/ship-(\d+)\.png/)
    if (startLevel && match && maxObstacle && difficulty) {
      localStorage.setItem('startLevel', startLevel)
      localStorage.setItem('startShip', parseInt(match[1]))
      localStorage.setItem('startMaxObstacle', maxObstacle)
      localStorage.setItem('startDifficulty', difficulty)
      window.location.reload()
    }
  }

  document.addEventListener('keyup', stopMoving)
  document.addEventListener('keydown', keydownListener)
  buttonLeft.addEventListener('click', leftButtonListener)
  buttonRight.addEventListener('click', rightButtonListener)
  startButton.addEventListener('click', startButtonListener)
  restartGameButton.addEventListener('click', restartListener)
  menuButton.addEventListener('click', toggleMenuListener)
  menuLevels.forEach((el) => el.addEventListener('click', goToLevelListener))

  setTimeout(() => {
    if (getLevel() >= 3) {
      buttonLeft.addEventListener('mousedown', leftMouseDown)
      buttonRight.addEventListener('mousedown', rightMouseDown)
      buttonLeft.addEventListener('mouseup', stopMoving)
      buttonRight.addEventListener('mouseup', stopMoving)

      buttonLeft.addEventListener('touchstart', leftTouchStart)
      buttonRight.addEventListener('touchstart', rightTouchStart)
      buttonLeft.addEventListener('touchend', stopMoving)
      buttonRight.addEventListener('touchend', stopMoving)
    }
  }, 0)
}
