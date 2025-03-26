export function moveShip(direction, shipImage, shipWrapper) {
  shipWrapper.style.removeProperty('transition')
  shipWrapper.style.transition = 'left 0.3s ease'
  shipImage.style.transition = 'transform 0.3s ease, filter 0.3s ease'
  shipWrapper.classList.add(`bank-${direction}`)
  setTimeout(() => {
    shipWrapper.classList.remove(`bank-${direction}`)
    shipImage.style.removeProperty('transition')
  }, 300)
}
