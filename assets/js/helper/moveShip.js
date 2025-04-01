import { moveShipDynamic } from '../mechanics/shipMove.js'
import { shipWrapper, shipImage } from '../main.js'

let moveInterval

export function startMoving(direction) {
  shipImage.style.removeProperty('transition')
  shipImage.style.transition = 'transform 0.3s ease, filter 0.3s ease'
  shipWrapper.classList.add(`move-${direction}`)

  if (moveInterval) clearInterval(moveInterval)
  moveInterval = setInterval(() => {
    moveShipDynamic(direction)
  }, 16)
}

export function stopMoving() {
  shipImage.style.removeProperty('transition')
  shipWrapper.classList.remove('move-left', 'move-right')

  clearInterval(moveInterval)
}
