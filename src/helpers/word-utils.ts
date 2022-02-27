import { allWords as words } from 'src/static'

const shuffleWords = (): string[] => {
  for (let i = words.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = words[i]
    words[i] = words[j]
    words[j] = temp
  }

  return words
}

const numberOfDifferentLetters = (word: string): number => {
  return word.split('').reduce((letters, letter) => (letters.includes(letter) ? letters : letters + letter), '').length
}

export const generateWord = (): string[] => {
  // all letters have to be different
  return (shuffleWords().find((word) => numberOfDifferentLetters(word) === 5) as string).split('')
}

const checkLetterInWord = (word: string, letter: { value: string; count: number; wrongSpots: number[] }): boolean => {
  if (letter.wrongSpots.some((index) => word.charAt(index) === letter.value)) {
    return false
  }
  if (letter.count < 5) {
    return (word.match(new RegExp(letter.value, 'g')) || []).length === letter.count
  } else {
    return word.includes(letter.value)
  }
}

export interface Hint {
  notInWord: string[]
  inWord: { value: string; count: number; wrongSpots: number[] }[]
  spots: (null | string)[]
}

export const findNextWord = (hints: Hint): string | false => {
  const shuffledWords = shuffleWords()
  let maxDistinctLetterCount = 0
  let wordFound = ''
  shuffledWords.forEach((word) => {
    if (!hints.notInWord.some((letter) => word.includes(letter))) {
      if (!hints.inWord.some((letter) => !checkLetterInWord(word, letter))) {
        if (!hints.spots.some((letter, i) => (!letter ? false : word.charAt(i) !== letter))) {
          const distinctLetterCount = numberOfDifferentLetters(word)
          if (distinctLetterCount > maxDistinctLetterCount) {
            maxDistinctLetterCount = distinctLetterCount
            wordFound = word
          }
        }
      }
    }
  })
  return wordFound || false
}
