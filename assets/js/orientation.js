const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
}

const hideUrlBar = () => {
  if (isMobileDevice()) {
    window.scrollTo(0, 1)
    setTimeout(() => {
      window.scrollTo(0, 1)
    }, 100)
  }
}

window.addEventListener('resize', checkOrientation)
window.addEventListener('load', checkOrientation)

function checkOrientation() {
  if (window.innerHeight > window.innerWidth) {
    showLandscapeModal()
  } else {
    hideLandscapeModal()
    hideUrlBar()
  }
}

showLandscapeModal = () => {
  document.querySelector('.landscape-modal').style.display = 'flex'
}

hideLandscapeModal = () => {
  document.querySelector('.landscape-modal').style.display = 'none'
}
