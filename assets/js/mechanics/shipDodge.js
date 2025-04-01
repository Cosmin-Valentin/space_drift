export function shipDodge(direction, shipImage, shipWrapper) {
  shipWrapper.style.removeProperty('transition')
  shipWrapper.style.transition = 'left 0.3s ease'
  shipImage.style.transition = 'transform 0.3s ease, filter 0.3s ease'
  shipWrapper.classList.add(`dodge-${direction}`)
  setTimeout(() => {
    shipWrapper.classList.remove(`dodge-${direction}`)
    shipImage.style.removeProperty('transition')
  }, 300)
}
