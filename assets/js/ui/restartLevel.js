import { reStartButton, init } from '../main.js'

export function restartLevel() {
  const leftRestartBtn = document.querySelector('.top-left-banner')

  if (!leftRestartBtn) return

  leftRestartBtn.style.animation = '0.8s linear infinite flicker'
  leftRestartBtn.style.cursor = 'pointer'
  leftRestartBtn.textContent = 'Restart level?'

  const handleClick = () => {
    reStartButton.style.removeProperty('animation')
    leftRestartBtn.style.removeProperty('animation')
    leftRestartBtn.style.removeProperty('cursor')
    leftRestartBtn.innerHTML = 'Your score: <span>0</span>'
    init(true)
    leftRestartBtn.removeEventListener('click', handleClick)
  }

  leftRestartBtn.removeEventListener('click', handleClick)
  leftRestartBtn.addEventListener('click', handleClick)
}
