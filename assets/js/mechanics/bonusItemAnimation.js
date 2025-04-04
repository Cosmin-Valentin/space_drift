import { updatePrompt } from '../ui/prompt.js'

export function bonusItemAnimation(ship, bonusType) {
  return new Promise((resolve) => {
    const bonusText =
      bonusType === 'cookie'
        ? 'Speed Reduced!'
        : bonusType === 'eat-me'
        ? 'Size Increased!'
        : 'Size Decreased!'
    updatePrompt(bonusText, 1000)

    const duration = 500

    const flashes = document.querySelectorAll('.flash-animation')
    if (flashes.length > 0) {
      flashes.forEach((el) => el.remove())
    }

    const flash = document.createElement('div')
    flash.classList.add('flash-animation')
    const img = document.createElement('img')
    const bonusClass =
      bonusType === 'cookie'
        ? 'rewind'
        : bonusType === 'eat-me'
        ? 'grow'
        : 'shrink'
    img.src = '/assets/images/env/' + bonusClass + '.png'
    img.classList.add(bonusClass)
    flash.appendChild(img)
    ship.appendChild(flash)

    setTimeout(() => {
      flash.remove()
      resolve()
    }, duration)
  })
}
