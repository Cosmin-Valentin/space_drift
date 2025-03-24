const healthBarFill = document.querySelector('.healthbar-fill')
let currentHealth = 100

function updateHealthBar(healthbarPercentage) {
  healthBarFill.style.transform = `scaleX(${healthbarPercentage / 100})`
}

export function takeDamage(damage) {
  currentHealth -= damage
  if (currentHealth <= 0) {
    currentHealth = 0
  }

  updateHealthBar(currentHealth)
}
