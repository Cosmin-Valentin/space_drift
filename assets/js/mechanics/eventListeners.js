import {
  handleDirection,
  startGame,
  handleTouch,
  removePressedClass,
  startButton,
  reStartButton,
  isProcessing,
  isGameStarted
} from '../main.js'

let keydownListener
let leftButtonListener
let rightButtonListener
let startButtonListener
let restartListener

const buttonLeft = document.querySelector('.bottom-dashboard.bottom-left')
const buttonRight = document.querySelector('.bottom-dashboard.bottom-right')

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

  keydownListener = (e) => {
    if (isProcessing) return

    const leftKeys = invertControls ? ['d', 'ArrowRight'] : ['a', 'ArrowLeft']
    const rightKeys = invertControls ? ['a', 'ArrowLeft'] : ['d', 'ArrowRight']

    if (leftKeys.includes(e.key)) handleDirection('left')
    if (rightKeys.includes(e.key)) handleDirection('right')
    if (['Enter', ' '].includes(e.key) && !isGameStarted) startGame()
  }

  leftButtonListener = (e) => (
    handleTouch(e, invertControls ? 'right' : 'left'), removePressedClass()
  )
  rightButtonListener = (e) => (
    handleTouch(e, invertControls ? 'left' : 'right'), removePressedClass()
  )
  startButtonListener = () => startGame()
  restartListener = (e) => {
    e.target.style.opacity = 0.5
    setTimeout(() => window.location.reload(), 200)
  }

  document.addEventListener('keydown', keydownListener)
  buttonLeft.addEventListener('click', leftButtonListener)
  buttonRight.addEventListener('click', rightButtonListener)
  startButton.addEventListener('click', startButtonListener)
  reStartButton.addEventListener('click', restartListener)
}
