const buttonLeft = document.querySelector('.bottom-dashboard.bottom-left')
const buttonRight = document.querySelector('.bottom-dashboard.bottom-right')
let isProcessing = false
const eventDuration = 100
const shipImage = document.querySelector('.ship img')
const shipWrapper = document.querySelector('.ship-wrapper')
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
    changeShip(direction)
  } else if (direction === 'right' && shipIndex < ships.length - 1) {
    shipIndex++
    changeShip(direction)
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

function changeShip(direction) {
  shipWrapper.style.transition = 'bottom 0.3s ease, left 0.5s ease'
  shipWrapper.style.left = direction === 'right' ? '-100%' : '200%'

  setTimeout(() => {
    shipImage.src = `images/ships/${ships[shipIndex]}.png`

    shipWrapper.style.transition = 'none'
    shipWrapper.style.left = direction === 'right' ? '200%' : '-100%'
    setTimeout(() => {
      shipWrapper.style.transition = 'bottom 0.3s ease, left 0.5s ease'
      shipWrapper.style.left = '50%'

      setTimeout(() => {
        addTiltEffect()
      }, 500)
    }, 50)
  }, 500)
}

function addTiltEffect() {
  shipImage.style.transition = 'transform 0.3s ease-in-out'
  shipImage.style.transform = `rotate3d(0, 1, 0, ${
    shipIndex % 2 ? '' : '-'
  }15deg)`
  setTimeout(() => {
    shipImage.style.transform = 'rotate3d(0, 1, 0, 0deg)'
  }, 300)
}
