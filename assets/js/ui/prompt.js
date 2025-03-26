export function updatePrompt(prompt, message) {
  return new Promise((resolve) => {
    try {
      if (!prompt) {
        console.error('Error: Prompt element is null or undefined.')
        return
      }

      const promptTextElement = prompt.querySelector('.game-prompt-text')
      if (!promptTextElement) {
        console.error('Error: .game-prompt-text element not found.')
        return
      }

      prompt.style.removeProperty('display')
      promptTextElement.innerHTML = message

      setTimeout(() => {
        prompt.style.display = 'none'
        resolve()
      }, 3000)
    } catch (error) {
      console.error('Error in updatePrompt:', error)
    }
  })
}
