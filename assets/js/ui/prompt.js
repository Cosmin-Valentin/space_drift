import { gamePrompt } from '../main.js'

export function updatePrompt(message, duration = 3000) {
  return new Promise((resolve) => {
    try {
      if (!gamePrompt) {
        console.error('Error: Prompt element is null or undefined.')
        return
      }

      const promptTextElement = gamePrompt.querySelector('.game-prompt-text')
      if (!promptTextElement) {
        console.error('Error: .game-prompt-text element not found.')
        return
      }

      gamePrompt.style.removeProperty('display')
      promptTextElement.innerHTML = message

      setTimeout(() => {
        gamePrompt.style.display = 'none'
        resolve()
      }, duration)
    } catch (error) {
      console.error('Error in updatePrompt:', error)
    }
  })
}
