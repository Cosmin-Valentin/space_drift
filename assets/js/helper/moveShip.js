import { moveShipDynamic } from '../mechanics/shipMove.js'
import { shipWrapper, shipImage } from '../main.js'

let moveInterval

export function startMoving(direction) {
  shipWrapper.style.removeProperty('transition')
  shipImage.style.removeProperty('transition')
  shipImage.style.transition = 'transform 0.3s ease, filter 0.3s ease'
  shipWrapper.classList.add(`move-${direction}`)
  document
    .querySelector(`.bottom-dashboard.bottom-${direction}`)
    .classList.add('pressed')

  if (moveInterval) clearInterval(moveInterval)
  moveInterval = setInterval(() => {
    moveShipDynamic(direction)
  }, 16)
}

export function stopMoving() {
  shipImage.style.removeProperty('transition')
  shipWrapper.classList.remove('move-left', 'move-right')
  document
    .querySelectorAll('.bottom-dashboard')
    .forEach((el) => el.classList.remove('pressed'))

  clearInterval(moveInterval)
}
