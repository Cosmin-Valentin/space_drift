export function updatePrompt(prompt, message) {
  prompt.style.removeProperty('display')
  prompt.querySelector('.game-prompt-text').innerHTML = message
  setTimeout(() => {
    prompt.style.display = 'none'
  }, 3000)
}
