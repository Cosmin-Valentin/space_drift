import { startButton, reStartButton, gameWrapper } from '../main.js'

export function travelToNextLevel() {
  return new Promise((resolve) => {
    const duration = 6000
    gameWrapper.style.backgroundImage =
      "url('../assets/images/background/travel-start.png')"

    hideElements()
    shipTravelAnimation()

    setTimeout(() => {
      gameWrapper.style.backgroundImage =
        "url('../assets/images/background/travel-end.png')"
    }, 3000)

    setTimeout(() => {
      gameWrapper.style.removeProperty('background-image')
      gameWrapper.querySelector('.ship-travel').remove()
      showElements()
      resolve()
    }, duration)
  })
}

function shipTravelAnimation() {
  const shipImgSrc = gameWrapper.querySelector('.ship img').src
  const shipTravel = document.createElement('div')
  const ship = document.createElement('img')
  const shipFlame = document.createElement('div')

  ship.src = shipImgSrc
  shipTravel.classList.add('ship-travel')
  shipFlame.classList.add('ship-travel-flame')
  shipTravel.appendChild(ship)
  shipTravel.appendChild(shipFlame)
  gameWrapper.appendChild(shipTravel)
  if (shipImgSrc.includes('2')) {
    shipFlame.style.left = '15vh'
  }
}

function hideElements() {
  startButton.style.opacity = '0'
  reStartButton.style.opacity = '0'
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
  reStartButton.style.removeProperty('opacity')
}
