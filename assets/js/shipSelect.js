const ships = ['ship-1', 'ship-2', 'ship-3', 'ship-4']
let shipIndex = 0

export function changeShip(direction, shipImage, shipWrapper) {
  if (direction === 'left' && shipIndex > 0) {
    shipIndex--
  } else if (direction === 'right' && shipIndex < ships.length - 1) {
    shipIndex++
  } else {
    return
  }

  shipWrapper.style.transition = 'left 0.3s ease'
  shipWrapper.style.left = direction === 'right' ? '-100%' : '200%'

  setTimeout(() => {
    shipImage.src = `assets/images/ships/${ships[shipIndex]}.png`

    shipWrapper.style.transition = 'none'
    shipWrapper.style.left = direction === 'right' ? '200%' : '-100%'

    setTimeout(() => {
      shipWrapper.style.transition = 'left 0.3s ease'
      shipWrapper.style.left = '50%'

      setTimeout(() => {
        addTiltEffect(shipImage)
        shipWrapper.style.removeProperty('transition')
        shipWrapper.style.removeProperty('left')
      }, 300)
    }, 50)
  }, 300)
}

function addTiltEffect(shipImage) {
  shipImage.style.transition = 'transform 0.3s ease-in-out'
  shipImage.style.transform = `rotate3d(0, 1, 0, ${
    shipIndex % 2 ? '' : '-'
  }15deg)`

  setTimeout(() => {
    shipImage.style.transform = 'rotate3d(0, 1, 0, 0deg)'
    setTimeout(() => {
      shipImage.style.removeProperty('transition')
      shipImage.style.removeProperty('transform')
    }, 300)
  }, 300)
}
