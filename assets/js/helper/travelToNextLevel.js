import { startButton, menuButton, gameWrapper } from '../main.js'

export function travelToNextLevel(restart = false) {
  return new Promise((resolve) => {
    const travelStart = restart
      ? "url('../assets/images/background/travel-rs-start.png')"
      : "url('../assets/images/background/travel-start.png')"
    const travelEnd = restart
      ? "url('../assets/images/background/travel-rs-end.png')"
      : "url('../assets/images/background/travel-end.png')"
    const duration = 6000
    gameWrapper.style.backgroundImage = travelStart

    hideElements()
    shipTravelAnimation(restart)

    setTimeout(() => {
      gameWrapper.style.backgroundImage = travelEnd
    }, 3000)

    setTimeout(() => {
      gameWrapper.style.removeProperty('background-image')
      gameWrapper
        .querySelector(restart ? '.ship-travel-rs' : '.ship-travel')
        .remove()
      showElements()
      resolve()
    }, duration)
  })
}

function shipTravelAnimation(restart = false) {
  const shipImgSrc = gameWrapper.querySelector('.ship img').src
  const shipTravel = document.createElement('div')
  const ship = document.createElement('img')
  const shipFlame = document.createElement('div')

  ship.src = shipImgSrc
  restart
    ? shipTravel.classList.add('ship-travel-rs')
    : shipTravel.classList.add('ship-travel')
  shipFlame.classList.add('ship-travel-flame')
  shipTravel.appendChild(ship)
  shipTravel.appendChild(shipFlame)
  gameWrapper.appendChild(shipTravel)
  if (shipImgSrc.includes('2')) {
    shipFlame.style.left = restart ? '-10vh' : '15vh'
  }
}

function hideElements() {
  startButton.style.opacity = '0'
  menuButton.style.opacity = '0'
  document.querySelector('.top-left-banner').style.opacity = '0'
  document.querySelector('.healthbar').style.opacity = '0'
  gameWrapper.querySelector('.game-inner').style.opacity = '0'
  document.querySelectorAll('.bottom-dashboard').forEach((el) => {
    el.style.opacity = '0'
  })
}

function showElements() {
  document.querySelectorAll('.bottom-dashboard').forEach((el) => {
    el.style.removeProperty('opacity')
  })
  document.querySelector('.top-left-banner').style.removeProperty('opacity')
  document.querySelector('.healthbar').style.removeProperty('opacity')
  gameWrapper.querySelector('.game-inner').style.removeProperty('opacity')
  startButton.style.removeProperty('opacity')
  menuButton.style.removeProperty('opacity')
}
