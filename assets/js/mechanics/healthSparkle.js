export function healthSparkle(ship, fullAnimation = false) {
  return new Promise((resolve) => {
    const duration = 500

    const flashes = document.querySelectorAll('.flash-animation')
    if (flashes.length > 0) {
      flashes.forEach((el) => el.remove())
    }

    const flash = document.createElement('div')
    flash.classList.add('flash-animation')
    const img = document.createElement('img')
    img.src = '/assets/images/env/sparkle.png'
    flash.appendChild(img)
    ship.appendChild(flash)

    if (!fullAnimation) {
      setTimeout(() => {
        flash.remove()
        resolve()
      }, duration)
    } else {
      const rotations = [180, 360, 180]
      let delay = 0

      rotations.forEach((rotation) => {
        setTimeout(() => {
          img.style.transform = `rotate(${rotation}deg)`
        }, delay)
        delay += duration
      })

      setTimeout(() => {
        flash.remove()
        resolve()
      }, delay)
    }
  })
}
