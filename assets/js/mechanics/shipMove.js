import { shipWrapper } from '../main.js'

export function moveShipDynamic(direction) {
  const minLeft = window.innerWidth < 769 ? 120 : 170
  const maxLeft =
    window.innerWidth < 769 ? window.innerWidth - 120 : window.innerWidth - 170

  const moveSpeed = (maxLeft - minLeft) * 0.02
  let currentLeft = parseInt(getComputedStyle(shipWrapper).left, 10)

  if (direction === 'left' && currentLeft > minLeft) {
    shipWrapper.style.left = `${currentLeft - moveSpeed}px`
  }
  if (direction === 'right' && currentLeft < maxLeft) {
    shipWrapper.style.left = `${currentLeft + moveSpeed}px`
  }
}
