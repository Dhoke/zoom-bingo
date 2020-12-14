import React, { useContext} from 'react'
import classes from './GamePage.module.css'
import BingoCard from '../BingoCard/BingoCard'
import { WebSocketContext } from '../../Contexts/WebSocketContext'
import { GameContext } from '../../Contexts/GameContext'

const GamePage = () => {

    const websockets = useContext(WebSocketContext)
    const context = useContext(GameContext)

    
    // Display winner message if required
    let winnerModal = null
    if (websockets.winner !== null) {
        winnerModal = (
            <div className={classes.modalBack}>
                <div className={classes.modalCard}>
                    {websockets.winner}
                </div>
            </div>
        )
    }

    // Create cards with real text
    let content = <h1>Play Paused</h1>
    if(websockets.allowPlay) {
        content = context.cardText.map((row, i) => {
            const cards = row.map((c, j) => {
                return (
                    <BingoCard 
                        editable={true}
                        i={i}
                        j={j}
                        onUpdate={context.updateBoard}
                        marked={context.board[i][j] === 1}
                        text={c}
                    />
                )
            })
            return (
                <div key={i} className={classes.row}>
                    {cards}
                </div>
            )
        })
    }

    const bingoButton = websockets.allowPlay ? <button onClick={context.validate}>BINGO!</button> : null

    return (
        <div>
            <div className={classes.gameContainer}>
                {content}
            </div>
            {bingoButton}
            {winnerModal}
        </div>
    )
}

export default GamePage;