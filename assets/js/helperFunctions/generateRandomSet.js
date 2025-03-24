export function generateRandomSet(length, max) {
  const results = new Set()

  while (results.size < length) {
    const randomNumber = Math.floor(Math.random() * (max + 1))

    results.add(randomNumber)
  }

  return results
}
