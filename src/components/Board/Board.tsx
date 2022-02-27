import React from 'react'
import { useGame } from 'src/context'
import * as S from './styles'

const Board: React.FC = () => {
  const { board, currentTry, switchHint } = useGame()

  return (
    <S.OuterContainer>
      <S.InnerContainer>
        {board.map((row, i) => (
          <S.Row key={i}>
            {row.map((cell, j) => (
              <S.Cell
                key={j}
                state={cell.state}
                onClick={i === currentTry && cell.letter.length !== 0 ? () => switchHint(j) : undefined}
                enabled={i === currentTry && cell.letter.length !== 0}
              >
                <S.Letter variant="h4" fontWeight="600">
                  {cell.letter.toUpperCase()}
                </S.Letter>
              </S.Cell>
            ))}
          </S.Row>
        ))}
      </S.InnerContainer>
    </S.OuterContainer>
  )
}

export default Board
