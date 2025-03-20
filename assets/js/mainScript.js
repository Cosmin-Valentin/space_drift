import { changeShip } from './shipSelect.js'

const buttonLeft = document.querySelector('.bottom-dashboard.bottom-left')
const buttonRight = document.querySelector('.bottom-dashboard.bottom-right')
const shipImage = document.querySelector('.ship img')
const shipWrapper = document.querySelector('.ship-wrapper')
const startButton = document.querySelector('.top-right-banner')
const gamePrompt = document.querySelector('.game-prompt')
let isProcessing = false
let isGameStarted = false
const eventDuration = 100

document.addEventListener('keydown', (e) => {
  if (isProcessing) return
  if (['a', 'ArrowLeft'].includes(e.key)) handleDirection('left')
  if (['d', 'ArrowRight'].includes(e.key)) handleDirection('right')
})

buttonLeft.addEventListener('touchstart', (e) => {
  handleTouch(e, 'left')
})
buttonRight.addEventListener('touchstart', (e) => {
  handleTouch(e, 'right')
})

startButton.addEventListener('click', () => {
  shipWrapper.style.transition = 'bottom 1s ease-in'
  gamePrompt.style.display = 'none'
  shipWrapper.classList.remove('choose-ship')
  startButton.style.display = 'none'
  isGameStarted = true
})

function handleDirection(direction) {
  isProcessing = true
  document
    .querySelector(`.bottom-dashboard.bottom-${direction}`)
    .classList.add('pressed')

  changeShip(isGameStarted, direction, shipImage, shipWrapper)
  moveShip(direction)

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

function moveShip(direction) {
  if (!isGameStarted) return

  shipWrapper.style.removeProperty('transition')
  shipWrapper.style.transition = 'left 0.3s ease'
  shipImage.style.transition = 'transform 0.3s ease, filter 0.3s ease'
  shipWrapper.classList.add(`bank-${direction}`)
  setTimeout(() => {
    shipWrapper.classList.remove(`bank-${direction}`)
    shipImage.style.removeProperty('transition')
  }, 300)
}
