export function levelProgress(level, menuLevels) {
  const stored = localStorage.getItem('levelProgress')
  const currentProgress = stored == null ? 0 : parseInt(stored)
  const progress = Math.max(currentProgress, level)
  localStorage.setItem('levelProgress', progress.toString())

  menuLevels.forEach((el, index) => {
    if (index <= progress) {
      el.style.removeProperty('pointer-events')
      el.style.removeProperty('opacity')
    } else {
      el.style.pointerEvents = 'none'
      el.style.opacity = 0.5
    }
  })
}
