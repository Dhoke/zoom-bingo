import React, { useState, useContext } from 'react'
import { WebSocketContext } from './WebSocketContext'
import { pathExists } from '../Functions/validators'

export const GameContext = React.createContext()

const GameContextProvider = (props) => {

    const context = useContext(WebSocketContext)

    const cards = [
        'Sorry I was on mute', 'Can everyone see my screen?', 'Child or animal noises', 'Child or animal enters room', '2020',
        'Loud echo or feedback', "I'm sorry, you cut out", "(name), are you there?", "Can you repeat that?", "Is everyone here?",
        "Weather mention", "We'll give everyone some time back", "Christmas break", "Your screen is frozen", "Working from home",
        "Unprecedented", "Someone NOT working from home", "Who's up next?", "Someone is wearing Christmas accessory", "Can you hear me now?",
        "People talking at same time", "Someone has a drink", "Use this time to reset", "Someone dancing", "Having trouble logging in"
    ]

    const shuffle = (cards) => {
        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cards[i], cards[j]] = [cards[j], cards[i]];
        }
    }

    // Create a shuffled version of the cards on first go
    const [cardText, setCards] = useState(() => {
        shuffle(cards)

        const allRows = []
        let currentRow = []
        for (let i = 0; i < cards.length; i++) {
            currentRow.push(cards[i])
            if (currentRow.length === 5) {
                allRows.push(currentRow)
                currentRow = []
            }
        }

        return allRows
    })

    // Map the board for easier processing
    const [board, setBoard] = useState([
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
    ])

    const updateBoard = (i, j, val) => {
        const currentBoard = [
            [...board[0]],
            [...board[1]],
            [...board[2]],
            [...board[3]],
            [...board[4]],
        ]

        currentBoard[i][j] = val
        setBoard(currentBoard)
    }

    // Validate the board
    const validate = () => {
        if (pathExists(board)) {
            context.socket.emit('validate', { cards: cardText, active: board, name: context.name })
        }
    }

    return (
        <GameContext.Provider value={{
            updateBoard,
            validate,

            board,
            cardText
        }}>
            {props.children}
        </GameContext.Provider>
    )
}

export default GameContextProvider