import { shipWrapper } from '../main.js'

export function moveShipDynamic(direction) {
  const windowWidth = window.innerWidth
  const isSmallScreen = windowWidth < 769

  const minLeft = isSmallScreen ? 120 : 170
  const maxLeft = isSmallScreen ? windowWidth - 120 : windowWidth - 170

  const moveSpeed = (maxLeft - minLeft) * 0.01
  let currentLeft = parseInt(getComputedStyle(shipWrapper).left, 10)

  if (direction === 'left' && currentLeft > minLeft) {
    shipWrapper.style.left = `${currentLeft - moveSpeed}px`
  }
  if (direction === 'right' && currentLeft < maxLeft) {
    shipWrapper.style.left = `${currentLeft + moveSpeed}px`
  }
}
