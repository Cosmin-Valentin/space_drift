export function showNamePrompt(submitName) {
  const modal = document.getElementById('nameModal')
  const input = document.getElementById('playerName')
  const button = document.getElementById('saveNameBtn')

  input.value = ''
  modal.style.display = 'flex'
  input.focus()

  button.onclick = () => {
    let name = input.value.trim().toUpperCase().substring(0, 3)
    if (name.length === 0) {
      name = 'AAA'
    }

    submitName(name)
    modal.style.display = 'none'
  }

  input.addEventListener('keyup', function (e) {
    const key = e.key.toLowerCase()
    if (key === 'enter' || key === ' ') {
      button.click()
    }
  })
}
