export class HighScoreManager {
  constructor(storageKey = 'highScores', maxEntries = 5) {
    this.storageKey = storageKey
    this.maxEntries = maxEntries
    this.defaultEntry = { score: 0, name: 'AAA' }

    this._initStorage()
  }

  _initStorage() {
    if (!localStorage.getItem(this.storageKey)) {
      const defaultScores = Array.from({ length: this.maxEntries }, () => ({
        ...this.defaultEntry
      }))
      this._saveScores(defaultScores)
    }
  }

  getScores() {
    return JSON.parse(localStorage.getItem(this.storageKey))
  }

  _saveScores(scores) {
    localStorage.setItem(this.storageKey, JSON.stringify(scores))
  }

  tryAddScore(score, getNameCallback) {
    let scores = this.getScores()

    if (score > scores[this.maxEntries - 1].score) {
      if (typeof getNameCallback === 'function') {
        getNameCallback((name) => {
          name = name.substring(0, 3).toUpperCase()

          scores.push({ score, name })
          scores.sort((a, b) => b.score - a.score)
          scores = scores.slice(0, this.maxEntries)

          this._saveScores(scores)
          renderHighScoresToPrompt(scores)
        })
      } else {
        console.warn(
          'getNameCallback must be a function that accepts a callback with the entered name.'
        )
      }
    }

    return scores
  }
}

function renderHighScoresToPrompt(scores) {
  const container = document.querySelector('.game-prompt-text')

  if (!container) return

  let html = `<div style="color: var(--green); margin-bottom: 20px;">BEST SCORES</div>`

  scores.forEach((entry, index) => {
    const rank = index + 1
    const score = entry.score.toString().padStart(6, '0')
    const name = entry.name.padEnd(3, ' ')

    html += `
      <div style="display: flex; justify-content: center; gap: 20px;">
        <span style="color: #00FFFF;">${rank}</span>
        <span style="color: var(--red)">${score}</span>
        <span style="color: var(--white);">: ${name}</span>
      </div>
    `
  })

  container.innerHTML = html
  container.classList.add('high-scores')
  container.parentElement.style.display = 'flex'
}
