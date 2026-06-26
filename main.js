import { generatePassword, checkPassword } from './passwordGenerator.js'

console.log('== Генерация паролей ==')
console.log('буквы и цифры:   ', generatePassword(12, 123))
console.log('со спецсимволами:', generatePassword(16, 7, { useSpecial: true }))

console.log()
console.log('== Проверка надёжности ==')
console.log('abc        ->', checkPassword('abc'))
console.log('abcdef1234 ->', checkPassword('abcdef1234'))
console.log('Abcdef123! ->', checkPassword('Abcdef123!'))
