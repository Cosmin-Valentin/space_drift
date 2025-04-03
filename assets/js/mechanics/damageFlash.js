export function damageFlash(ship, fullAnimation = false) {
  return new Promise((resolve) => {
    const duration = 500
    const flashImages = [
      '/assets/images/env/flash-st-one.png',
      '/assets/images/env/flash-st-two.png',
      '/assets/images/env/flash-st-three.png'
    ]

    const flashes = document.querySelectorAll('.flash-animation')
    if (flashes.length > 0) {
      flashes.forEach((el) => el.remove())
    }

    const flash = document.createElement('div')
    flash.classList.add('flash-animation')
    ship.appendChild(flash)

    const imageElements = flashImages.map((src) => {
      const img = document.createElement('img')
      img.src = src
      return img
    })

    let currentIndex = fullAnimation ? 0 : 2

    function showNextImage() {
      if (currentIndex < imageElements.length) {
        flash.appendChild(imageElements[currentIndex])
        currentIndex++
        setTimeout(showNextImage, duration)
      } else {
        imageElements.forEach((img) => img.remove())
        resolve()
      }
    }

    showNextImage()
  })
}
