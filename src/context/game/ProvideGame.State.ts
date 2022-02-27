import { useEffect, useState } from 'react'
import { findNextWord, generateWord, Hint } from 'src/helpers'
import _ from 'lodash'

interface Cell {
  letter: string
  state: 'empty' | 'filled' | 'notInWord' | 'inWord' | 'rightSpot'
}

export interface State {
  board: Cell[][]
  hint: Hint
  try: number
  currentCell: number
}

export interface GameContext {
  board: Cell[][]
  currentTry: number
  switchHint: (cellCol: number) => void
  resetGame: () => void
  screenKeyboardClick: (key: string) => void
}

const useProvideGame = () => {
  const [state, setState] = useState<State>({
    hint: { inWord: [], notInWord: [], spots: [null, null, null, null, null] },
    board: [],
    try: 0,
    currentCell: 4
  })
  const [snackbar, setSnackbar] = useState({ open: false, text: '' })

  const showSnackbar = (text: string) => {
    setSnackbar({ open: true, text })
  }

  const closeSnackbar = () => {
    setSnackbar({ ...snackbar, open: false })
  }

  const deleteLetter = () => {
    setState((s) => {
      s.board[s.try][s.currentCell] = { letter: '', state: 'empty' }
      return { ...s, board: s.board, currentCell: s.currentCell === -1 ? -1 : s.currentCell - 1 }
    })
  }

  const addLetter = (letter: string) => {
    setState((s) => {
      if (s.currentCell < 4) {
        s.board[s.try][s.currentCell + 1] = { letter, state: 'filled' }
        return { ...s, board: s.board, currentCell: s.currentCell + 1 }
      }
      return s
    })
  }

  const beginNextTry = () => {
    setState((s) => {
      let conflict = false

      const newState: State = _.cloneDeep(s)

      if (newState.currentCell !== 4) {
        showSnackbar('Not enough letters 😕️')
        return s
      }
      if (newState.try === 5) {
        showSnackbar('This was your last try. Hope you got it right!')
        return s
      }
      const letters: { value: string; count: number; wrongSpots: number[] }[] = []
      newState.board[newState.try].forEach(({ letter, state: cellState }, i) => {
        const index = letters.findIndex(({ value }) => value === letter)
        if (cellState === 'filled') {
          if (index > -1) {
            if (letters[index].count >= 6) {
              letters[index].count -= 5
              letters[index].wrongSpots.push(i)
            }
          }
          if (index === -1) {
            letters.push({ value: letter, count: 0, wrongSpots: [i] })
          }
        }
        if (cellState === 'inWord' || cellState === 'rightSpot') {
          if (index > -1) {
            letters[index].count += 1
            if (cellState !== 'rightSpot') {
              letters[index].wrongSpots.push(i)
            }
          }
          if (index === -1) {
            letters.push({ value: letter, count: 6, wrongSpots: cellState === 'rightSpot' ? [] : [i] })
          }
        }
        if (cellState === 'rightSpot') {
          if (newState.hint.spots[i] && newState.hint.spots[i] !== letter) {
            // conflict
            showSnackbar('You have conflicted hints 🤔️')
            conflict = true
          } else {
            newState.hint.spots[i] = letter
          }
        }
      })
      letters.forEach(({ value, count, wrongSpots }) => {
        if (count === 0) {
          if (!newState.hint.notInWord.includes(value)) {
            newState.hint.notInWord.push(value)
          }
          if (newState.hint.inWord.some(({ value: inWordValue }) => inWordValue === value)) {
            // conflict
            showSnackbar('You have conflicted hints 🤔️')
            conflict = true
          }
        } else {
          if (newState.hint.notInWord.includes(value)) {
            // conflict
            showSnackbar('You have conflicted hints 🤔️')
            conflict = true
          }
          const index = newState.hint.inWord.findIndex(({ value: inWordValue }) => inWordValue === value)
          if (index > -1) {
            const inWordCount = newState.hint.inWord[index].count
            if (count < inWordCount) {
              newState.hint.inWord[index].count = count
            }
            wrongSpots.forEach((spot) => {
              if (!newState.hint.inWord[index].wrongSpots.includes(spot)) {
                newState.hint.inWord[index].wrongSpots.push(spot)
              }
            })
            if (count < 6 && inWordCount < 6 && count > inWordCount) {
              // conflict
              showSnackbar('You have conflicted hints 🤔️')
              conflict = true
            }
          }
          if (index === -1) {
            newState.hint.inWord.push({ value, count, wrongSpots })
          }
        }
      })

      if (conflict) return s

      const nextWord = findNextWord(newState.hint)
      if (nextWord) {
        newState.board[newState.try] = newState.board[newState.try].map(({ letter, state }) => ({
          letter,
          state: state === 'filled' ? 'notInWord' : state
        }))
        newState.board[newState.try + 1] = nextWord.split('').map((letter) => ({ letter, state: 'filled' }))
        return { board: newState.board, hint: newState.hint, currentCell: 4, try: newState.try + 1 }
      } else {
        // no words can be found
        showSnackbar("Can't find a word based on your hints 😕️")

        return s
      }
    })
  }

  const handleKeyboardClick = (event: KeyboardEvent) => {
    const key = event.key
    if (key.length === 1 && /[a-zA-Z]/.test(key)) {
      addLetter(key)
    }
    if (key === 'Backspace') {
      deleteLetter()
    }
    if (key === 'Enter' || key === 'Space') {
      beginNextTry()
    }
  }

  const screenKeyboardClick = (key: string) => {
    if (key === 'backspace') {
      deleteLetter()
      return
    }
    if (key === 'enter') {
      beginNextTry()
      return
    }
    addLetter(key)
  }

  const newBoard = () => {
    const generatedWord = generateWord()
    const firstRow: Cell[] = generatedWord.map((letter) => ({ letter, state: 'filled' }))
    const otherRows = new Array<Cell>(5).fill({ letter: '', state: 'empty' })
    const board = new Array<Cell[]>(6)
    board[0] = firstRow
    board.fill(otherRows, 1, 6)

    return board
  }

  useEffect(() => {
    setState({ ...state, board: newBoard() })
    document.addEventListener('keydown', handleKeyboardClick)

    return () => {
      document.removeEventListener('keydown', handleKeyboardClick)
    }
  }, [])

  const switchHint = (cellCol: number) => {
    const { letter, state: currentState } = state.board[state.try][cellCol]
    const cell: Cell = { letter, state: currentState }

    if (currentState === 'filled') {
      cell.state = 'inWord'
    }
    if (currentState === 'inWord') {
      cell.state = 'rightSpot'
    }
    if (currentState === 'rightSpot') {
      cell.state = 'filled'
    }

    state.board[state.try][cellCol] = cell
    setState({ ...state, board: state.board })
  }

  const resetGame = () => {
    setState({
      hint: { inWord: [], notInWord: [], spots: [null, null, null, null, null] },
      board: newBoard(),
      try: 0,
      currentCell: 4
    })
  }

  return {
    board: state.board,
    currentTry: state.try,
    snackbar,
    switchHint,
    resetGame,
    screenKeyboardClick,
    closeSnackbar
  }
}

export default useProvideGame
