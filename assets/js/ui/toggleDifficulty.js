export function toggleDifficulty() {
  const difficultyLevelsContainer = document.querySelector('.difficulty-levels')

  if (difficultyLevelsContainer) {
    const levels =
      difficultyLevelsContainer.querySelectorAll('.difficulty-level')
    let currentLevelIndex = 0

    function updateSelectedLevel(newIndex = currentLevelIndex) {
      currentLevelIndex = newIndex
      levels.forEach((level, index) => {
        level.classList.remove('active')
        if (index === currentLevelIndex) {
          level.classList.add('active')
        }
      })
    }

    updateSelectedLevel()

    document.addEventListener('keydown', (event) => {
      if (levels.length > 0) {
        if (['ArrowUp', 'w'].includes(event.key)) {
          currentLevelIndex =
            (currentLevelIndex - 1 + levels.length) % levels.length
          updateSelectedLevel()
        } else if (['ArrowDown', 's'].includes(event.key)) {
          currentLevelIndex = (currentLevelIndex + 1) % levels.length
          updateSelectedLevel()
        }
      }
    })

    levels.forEach((level, index) => {
      level.addEventListener('mouseenter', () => {
        updateSelectedLevel(index)
      })
    })
  }
}
