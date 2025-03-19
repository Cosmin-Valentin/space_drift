const buttonLeft = document.querySelector('.bottom-dashboard.bottom-left')
const buttonRight = document.querySelector('.bottom-dashboard.bottom-right')
let isProcessing = false
const eventDuration = 100
const shipImage = document.querySelector('.ship img')
const ships = ['ship-1', 'ship-2', 'ship-3', 'ship-4']
let shipIndex = 0

document.addEventListener('keydown', (e) => {
  if (!isProcessing) {
    if (e.key === 'a' || e.key === 'ArrowLeft') {
      handleDirection('left')
    } else if (e.key === 'd' || e.key === 'ArrowRight') {
      handleDirection('right')
    }
  }
})

function handleDirection(direction) {
  console.log(direction)
  isProcessing = true
  document
    .querySelector(`.bottom-dashboard.bottom-${direction}`)
    .classList.add('pressed')

  if (direction === 'left' && shipIndex > 0) {
    shipIndex--
    changeShip()
  } else if (direction === 'right' && shipIndex < ships.length - 1) {
    shipIndex++
    changeShip()
  }

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

buttonLeft.addEventListener('touchstart', function (e) {
  handleTouch(e, 'left')
})
buttonRight.addEventListener('touchstart', function (e) {
  handleTouch(e, 'right')
})

function changeShip() {
  shipImage.src = `images/ships/${ships[shipIndex]}.png`
}
