import { changeShip } from './ui/shipSelect.js'
import { moveShip } from './mechanics/shipDodge.js'
import { spawnObstacle } from './mechanics/obstacle.js'
import { spawnObstacleOpposite } from './mechanics/obstacleOpposite.js'
import { updatePrompt } from './ui/prompt.js'
import { levelPrompts } from './ui/levelPrompts.js'
import { GameState } from './core/GameState.js'
import { countDown } from './ui/countDown.js'
import { setDifficulty } from './ui/setDifficulty.js'

const startButton = document.querySelector('.top-right-start-banner')
const reStartButton = document.querySelector('.top-right-restart-banner')
const buttonLeft = document.querySelector('.bottom-dashboard.bottom-left')
const buttonRight = document.querySelector('.bottom-dashboard.bottom-right')
const gameWrapper = document.querySelector('.game-wrapper')
const gamePrompt = document.querySelector('.game-prompt')
const path = document.querySelector('.path')
const shipWrapper = document.querySelector('.ship-wrapper')
const shipImage = document.querySelector('.ship img')

let isProcessing = false
let isGameStarted = false
let isDifficultySet = false
let isDifficultySettingInProgress = false
let difficulty = null
const eventDuration = 100
let maxObstacle = null
let level = 2

document.addEventListener('keydown', (e) => {
  if (isProcessing) return
  if (['a', 'ArrowLeft'].includes(e.key)) handleDirection('left')
  if (['d', 'ArrowRight'].includes(e.key)) handleDirection('right')
  if (['Enter', ' '].includes(e.key) && !isGameStarted) startGame()
})

buttonLeft.addEventListener('pointerdown', (e) => handleTouch(e, 'left'))
buttonRight.addEventListener('pointerdown', (e) => handleTouch(e, 'right'))
startButton.addEventListener('pointerdown', (e) => startGame())

buttonLeft.addEventListener('pointerup', removePressedClass)
buttonRight.addEventListener('pointerup', removePressedClass)
buttonLeft.addEventListener('touchend', removePressedClass, { passive: true })
buttonRight.addEventListener('touchend', removePressedClass, { passive: true })
buttonLeft.addEventListener('touchcancel', removePressedClass)
buttonRight.addEventListener('touchcancel', removePressedClass)

reStartButton.addEventListener('pointerdown', (e) => {
  e.target.style.opacity = 0.5
  setTimeout(() => window.location.reload(), 200)
})

async function init() {
  await updatePrompt(
    gamePrompt,
    level === 0
      ? 'Get most space <div class="target"></div> out of ' + maxObstacle
      : levelPrompts[level]
  )
  await countDown(level)

  const gameState = new GameState(
    gameWrapper,
    shipWrapper,
    path,
    level,
    handleGameEnd,
    maxObstacle
  )

  level < 2 ? spawnObstacle(gameState) : spawnObstacleOpposite(gameState)
}

function handleDirection(direction) {
  if (isDifficultySettingInProgress) return
  isProcessing = true
  document
    .querySelector(`.bottom-dashboard.bottom-${direction}`)
    .classList.add('pressed')

  isGameStarted && moveShip(direction, shipImage, shipWrapper)
  !isGameStarted && changeShip(direction, shipImage, shipWrapper)

  setTimeout(() => {
    isProcessing = false
    removePressedClass()
  }, eventDuration)
  return direction
}

function handleTouch(e, direction) {
  if (!isProcessing) {
    handleDirection(direction)
  }
  e.preventDefault()
}

async function startGame() {
  if (!isDifficultySet) {
    await setGameDifficulty()
  }

  prepareGameStart()
}

async function setGameDifficulty() {
  if (!isDifficultySettingInProgress) {
    isDifficultySettingInProgress = true
    difficulty = parseInt(await setDifficulty(gamePrompt))
    isDifficultySet = true
    isDifficultySettingInProgress = false
    startButton.style.opacity = 0.5
  } else {
    handleActiveDifficultySelection()
  }
}

function handleActiveDifficultySelection() {
  const activeDifficulty = gamePrompt.querySelector('.active')

  if (activeDifficulty) {
    difficulty = parseInt(activeDifficulty.dataset.level)
  } else {
    gamePrompt
      .querySelector('.difficulty-level:first-child')
      .classList.add('active')
    difficulty = 0
  }

  setTimeout(() => {
    isDifficultySettingInProgress = false
    startButton.style.opacity = 0.5
    gamePrompt.querySelector('.difficulty-levels').remove()
  }, 200)
}

function prepareGameStart() {
  startButton.style.opacity = 0.5
  setTimeout(() => {
    shipWrapper.style.transition = 'bottom 1s ease-in'
    shipWrapper.classList.remove('choose-ship')
    startButton.style.display = 'none'
    reStartButton.style.display = 'flex'
    gamePrompt.querySelector('.game-prompt-text').classList.remove('animated')

    maxObstacle ??= difficulty === 0 ? 60 : difficulty === 1 ? 80 : 100
    isGameStarted = true

    init()
  }, 200)
}

async function handleGameEnd(score) {
  const targetScore = Math.round(maxObstacle * 0.9)

  if (score < targetScore) {
    await updatePrompt(
      gamePrompt,
      `Game over! Try collecting over ${targetScore} to progress.`
    )
    reStartButton.style.animation =
      '0.8s linear 0s infinite normal none running flicker'
  } else if (level < 2) {
    await updatePrompt(gamePrompt, `Level Over! Congrats!`)
    level++
    init()
  } else {
    await updatePrompt(gamePrompt, `Game over! You're a true space cadet!`)
    reStartButton.style.animation =
      '0.8s linear 0s infinite normal none running flicker'
  }
}

function removePressedClass() {
  document
    .querySelectorAll('.bottom-dashboard')
    .forEach((el) => el.classList.remove('pressed'))
}
