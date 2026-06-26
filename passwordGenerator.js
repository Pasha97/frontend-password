const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz'
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const DIGITS = '0123456789'
const SPECIAL = '!@#$%^&*'

const nextRandom = (number) => (16807 * number) % 2147483647

const generatePassword = (length, seed, options = {}) => {
  if (length <= 0) {
    return ''
  }

  const { useUppercase = true, useDigits = true, useSpecial = false } = options

  let normalizedSeed = Math.abs(seed) % 2147483647

  if (normalizedSeed === 0) {
    normalizedSeed = 1
  }

  let alphabet = LOWERCASE

  if (useUppercase) {
    alphabet += UPPERCASE
  }

  if (useDigits) {
    alphabet += DIGITS
  }

  if (useSpecial) {
    alphabet += SPECIAL
  }

  let current = normalizedSeed
  let result = ''

  for (let i = 0; i < length; i++) {
    current = nextRandom(current)
    result += alphabet[current % alphabet.length]
  }

  return result
}

const checkPassword = (password) => {
  let score = 0

  if (password.length >= 8) {
    score++
  }

  let hasLower = false
  let hasUpper = false
  let hasDigit = false
  let hasSpecial = false

  for (const char of password) {
    if (char >= 'a' && char <= 'z') {
      hasLower = true
    } else if (char >= 'A' && char <= 'Z') {
      hasUpper = true
    } else if (char >= '0' && char <= '9') {
      hasDigit = true
    } else if (SPECIAL.includes(char)) {
      hasSpecial = true
    }
  }

  if (hasLower) {
    score++
  }

  if (hasUpper) {
    score++
  }

  if (hasDigit) {
    score++
  }

  if (hasSpecial) {
    score++
  }

  let verdict = ''
  
  if (score <= 2) {
    verdict = 'Слабый'
  } else if (score === 3) {
    verdict = 'Средний'
  } else if (score === 4) {
    verdict = 'Надёжный'
  } else {
    verdict = 'Очень надёжный'
  }

  return `${verdict} пароль (оценка ${score} из 5)`
}

export { generatePassword, checkPassword }
