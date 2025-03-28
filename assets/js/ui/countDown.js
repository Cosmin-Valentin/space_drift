export function countDown(level) {
  return new Promise((resolve) => {
    const countDown = document.querySelector('.count-down')
    const countDownText = document.querySelector('.count-down-text')
    const numbers = ['3', '2', '1', 'GO!']
    let i = 0

    countDownText.textContent = level === 0 ? 'Ready?' : 'Level ' + ++level
    countDown.style.display = 'flex'

    setTimeout(() => {
      const interval = setInterval(() => {
        if (i <= numbers.length) {
          countDownText.classList.add('reduce-animation')

          setTimeout(() => {
            countDownText.textContent = numbers[i]
            countDownText.classList.remove('reduce-animation')

            if (i === numbers.length) {
              clearInterval(interval)
              countDown.style.display = 'none'
              resolve()
            }
            i++
          }, 450)
        }
      }, 500)
    }, 1000)
  })
}
