const healthBarFill = document.querySelector('.healthbar-fill')
let currentHealth = null

export function resetHealth(reset) {
  currentHealth = null
  updateHealthBar(reset)
}

export function takeDamage(damage) {
  if (currentHealth === null) {
    currentHealth = 100
  }
  currentHealth -= damage
  if (currentHealth <= 0) {
    currentHealth = 0
  }

  updateHealthBar(currentHealth)
}

export function increaseHealth(health) {
  if (currentHealth === null) {
    currentHealth = 0
  }
  currentHealth += health
  if (currentHealth >= 100) {
    currentHealth = 100
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
