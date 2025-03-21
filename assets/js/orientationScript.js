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
  document.documentElement.style.setProperty('--vh', `${window.innerHeight}px`)
}
