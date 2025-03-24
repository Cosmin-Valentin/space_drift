const healthBarFill = document.querySelector('.healthbar-fill')
let currentHealth = 100

export function takeDamage(damage) {
  currentHealth -= damage
  if (currentHealth <= 0) {
    currentHealth = 0
  }

  updateHealthBar(currentHealth)
}

async function updateHealthBar(healthbarPercentage) {
  await applyFlickerAnimation(healthBarFill)
  healthBarFill.style.transform = `scaleX(${healthbarPercentage / 100})`
}

function applyFlickerAnimation(element) {
  return new Promise((resolve) => {
    element.classList.add('flicker-animation')

    element.addEventListener(
      'animationend',
      () => {
        element.classList.remove('flicker-animation')
        resolve()
      },
      { once: true }
    )
  })
}
