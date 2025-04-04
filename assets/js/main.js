import { GameState } from './core/GameState.js'
import { travelToNextLevel } from './helper/travelToNextLevel.js'
import { initializeEventListeners } from './mechanics/eventListeners.js'
import { shipDodge } from './mechanics/shipDodge.js'
import { spawnObstacle } from './mechanics/obstacle.js'
import { spawnAsteroids } from './mechanics/obstacleAsteriods.js'
import { spawnObstacleOpposite } from './mechanics/obstacleOpposite.js'
import { countDown } from './ui/countDown.js'
import { levelPrompts } from './ui/levelPrompts.js'
import { updatePrompt } from './ui/prompt.js'
import { restartLevel } from './ui/restartLevel.js'
import { changeShip } from './ui/shipSelect.js'
import { setDifficulty } from './ui/setDifficulty.js'

export const startButton = document.querySelector('.top-right-start-banner')
export const reStartButton = document.querySelector('.top-right-restart-banner')
export const gameWrapper = document.querySelector('.game-wrapper')
export const shipWrapper = document.querySelector('.ship-wrapper')
export const shipImage = document.querySelector('.ship img')
export let isProcessing = false
export let isGameStarted = false
export let level = 3

const gamePrompt = document.querySelector('.game-prompt')
const path = document.querySelector('.path')
const eventDuration = 100
let isDifficultySet = false
let isDifficultySettingInProgress = false
let difficulty = null
let maxObstacle = null

initializeEventListeners()

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

async function handleGameEnd(score, isInverted = false) {
  const targetScore = Math.round(maxObstacle * 0.9)

  if (isInverted) {
    await updatePrompt(gamePrompt, `Try avoiding over ${score} to progress.`)
    reStartButton.style.animation =
      '0.8s linear 0s infinite normal none running flicker'
    restartLevel()
  } else if (score < targetScore) {
    await updatePrompt(
      gamePrompt,
      `Try collecting over ${targetScore} to progress.`
    )
    reStartButton.style.animation =
      '0.8s linear 0s infinite normal none running flicker'
    restartLevel()
  } else if (level < 3) {
    await updatePrompt(gamePrompt, `Level Over! Congrats!`)
    if (++level === 3) {
      initializeEventListeners()
    }
    init()
  } else {
    await updatePrompt(gamePrompt, `Game over! You're a true space cadet!`)
    reStartButton.style.animation =
      '0.8s linear 0s infinite normal none running flicker'
  }
}

export async function init(restartLevel = false) {
  if (level > 0) {
    await travelToNextLevel(restartLevel)
  }
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

  if (level === 2) {
    initializeEventListeners(true)
    spawnObstacleOpposite(gameState, restartLevel)
  } else if (level === 3) {
    spawnAsteroids(gameState, restartLevel)
  } else {
    spawnObstacle(gameState, restartLevel)
  }
}

export function handleDirection(direction) {
  if (isDifficultySettingInProgress) return
  isProcessing = true
  document
    .querySelector(`.bottom-dashboard.bottom-${direction}`)
    .classList.add('pressed')

  isGameStarted && shipDodge(direction, shipImage, shipWrapper)
  !isGameStarted && changeShip(direction, shipImage, shipWrapper)

  setTimeout(() => {
    isProcessing = false
    removePressedClass()
  }, eventDuration)
  return direction
}

export function handleTouch(e, direction) {
  if (!isProcessing) {
    handleDirection(direction)
  }
  e.preventDefault()
}

export async function startGame() {
  if (!isDifficultySet) {
    await setGameDifficulty()
  }

  prepareGameStart()
}

export function removePressedClass() {
  document
    .querySelectorAll('.bottom-dashboard')
    .forEach((el) => el.classList.remove('pressed'))
}
