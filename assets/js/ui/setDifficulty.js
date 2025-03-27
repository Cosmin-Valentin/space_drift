export function setDifficulty(prompt) {
  return new Promise((resolve) => {
    const levels = document.createElement('div')

    levels.classList.add('difficulty-levels')
    levels.innerHTML = `
        <div class="difficulty-level" data-level="0">Easy</div>
        <div class="difficulty-level" data-level="1">Normal</div>
        <div class="difficulty-level" data-level="2">Hard</div>
        `

    prompt.querySelector('.game-prompt-text').innerHTML =
      'Select difficulty level'
    prompt.appendChild(levels)

    levels.addEventListener('click', (e) => {
      const level = e.target.dataset.level
      if (level) {
        levels.remove()
        resolve(level)
      }
    })
  })
}
