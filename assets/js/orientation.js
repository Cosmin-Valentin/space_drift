window.addEventListener('resize', checkOrientation)
window.addEventListener('load', checkOrientation)

function checkOrientation() {
  if (window.innerHeight > window.innerWidth) {
    showLandscapeModal()
  } else {
    hideLandscapeModal()
  }
}

showLandscapeModal = () => {
  document.querySelector('.landscape-modal').style.display = 'flex'
}

hideLandscapeModal = () => {
  document.querySelector('.landscape-modal').style.display = 'none'
}
