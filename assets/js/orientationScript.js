setScreenHeight()

window.addEventListener('resize', checkOrientation)
window.addEventListener('load', checkOrientation)

function checkOrientation() {
  if (window.innerHeight > window.innerWidth) {
    showLandscapeModal()
  } else {
    hideLandscapeModal()
    setScreenHeight()
  }
}

showLandscapeModal = () => {
  document.querySelector('.landscape-modal').style.display = 'flex'
}

hideLandscapeModal = () => {
  document.querySelector('.landscape-modal').style.display = 'none'
}

function setScreenHeight() {
  // const vh = window.visualViewport
  //   ? window.visualViewport.height
  //   : window.innerHeight
  // document.documentElement.style.setProperty('--vh', `${vh}px`)
  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen()
  } else if (document.documentElement.webkitRequestFullscreen) {
    document.documentElement.webkitRequestFullscreen()
  } else if (document.documentElement.msRequestFullscreen) {
    document.documentElement.msRequestFullscreen()
  }
}
