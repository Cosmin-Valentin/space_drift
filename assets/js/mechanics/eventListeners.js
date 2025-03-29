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
let pointerDownLeftListener
let pointerDownRightListener
let pointerUpListener
let touchEndListener
let touchCancelListener
let startButtonListener
let restartListener

const buttonLeft = document.querySelector('.bottom-dashboard.bottom-left')
const buttonRight = document.querySelector('.bottom-dashboard.bottom-right')

export function initializeEventListeners(invertControls = false) {
  if (keydownListener) document.removeEventListener('keydown', keydownListener)
  if (pointerDownLeftListener)
    buttonLeft.removeEventListener('pointerdown', pointerDownLeftListener)
  if (pointerDownRightListener)
    buttonRight.removeEventListener('pointerdown', pointerDownRightListener)
  if (pointerUpListener) {
    buttonLeft.removeEventListener('pointerup', pointerUpListener)
    buttonRight.removeEventListener('pointerup', pointerUpListener)
  }
  if (touchEndListener) {
    buttonLeft.removeEventListener('touchend', touchEndListener)
    buttonRight.removeEventListener('touchend', touchEndListener)
  }
  if (touchCancelListener) {
    buttonLeft.removeEventListener('touchcancel', touchCancelListener)
    buttonRight.removeEventListener('touchcancel', touchCancelListener)
  }
  if (startButtonListener)
    startButton.removeEventListener('pointerdown', startButtonListener)
  if (restartListener)
    reStartButton.removeEventListener('pointerdown', restartListener)

  keydownListener = (e) => {
    if (isProcessing) return

    const leftKeys = invertControls ? ['d', 'ArrowRight'] : ['a', 'ArrowLeft']
    const rightKeys = invertControls ? ['a', 'ArrowLeft'] : ['d', 'ArrowRight']

    if (leftKeys.includes(e.key)) handleDirection('left')
    if (rightKeys.includes(e.key)) handleDirection('right')
    if (['Enter', ' '].includes(e.key) && !isGameStarted) startGame()
  }

  pointerDownLeftListener = (e) =>
    handleTouch(e, invertControls ? 'right' : 'left')
  pointerDownRightListener = (e) =>
    handleTouch(e, invertControls ? 'left' : 'right')
  pointerUpListener = removePressedClass
  touchEndListener = removePressedClass
  touchCancelListener = removePressedClass
  startButtonListener = () => startGame()
  restartListener = (e) => {
    e.target.style.opacity = 0.5
    setTimeout(() => window.location.reload(), 200)
  }

  document.addEventListener('keydown', keydownListener)
  buttonLeft.addEventListener('pointerdown', pointerDownLeftListener)
  buttonRight.addEventListener('pointerdown', pointerDownRightListener)
  buttonLeft.addEventListener('pointerup', pointerUpListener)
  buttonRight.addEventListener('pointerup', pointerUpListener)
  buttonLeft.addEventListener('touchend', touchEndListener, { passive: true })
  buttonRight.addEventListener('touchend', touchEndListener, { passive: true })
  buttonLeft.addEventListener('touchcancel', touchCancelListener)
  buttonRight.addEventListener('touchcancel', touchCancelListener)
  startButton.addEventListener('pointerdown', startButtonListener)
  reStartButton.addEventListener('pointerdown', restartListener)
}
