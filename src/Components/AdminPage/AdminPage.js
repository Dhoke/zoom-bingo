import React, { useContext, useState } from 'react'
import { WebSocketContext } from '../../Contexts/WebSocketContext'
import { useHistory } from 'react-router'
import BingoCard from '../BingoCard/BingoCard'
import classes from './AdminPage.module.css'

const AdminPage = () => {

    const context = useContext(WebSocketContext)

    const [winnerCards, setWinnerCards] = useState([])
    const [winnerActive, setWinnerActive] = useState([])
    const [winnerName, setWinnerName] = useState('')

    const history = useHistory()
    if (context.socket === null) {
        history.push('/')
    }

    const togglePlay = () => {
        setWinnerCards([])
        setWinnerActive([])
        setWinnerName('')
        context.doTogglePlay()
    }

    const doDeclareWinner = () => {
        context.doDeclareWinner(winnerName)
    }

    if (context.socket != null) {
        context.socket.on('adminValidate', ({ cards, active, name }) => {
            setWinnerActive(active)
            setWinnerCards(cards)
            setWinnerName(name)
        })
    }

    // List of players
    let players = null
    if (context.players.length > 0) {
        players = (
            <div className={classes.players}>
                <h1>Players list</h1>
                {context.players.map(p => <div className={classes.player}>{p}</div>)}
            </div>
        )
    }

    // Generate winners cards if needed
    let winnersInfo = null
    if (winnerCards.length > 0) {
        const rows = winnerCards.map((row, i) => {
            const cards = row.map((c, j) => {
                return <BingoCard
                    editable={false}
                    i={i}
                    j={j}
                    onUpdate={() => console.log('No updates allowed.')}
                    marked={winnerActive[i][j] === 1}
                    text={c}
                />
            })
            return (
                <div className={classes.row}>
                    {cards}
                </div>
            )
        })
        winnersInfo = (
            <div className={classes.winnersArea}>
                <h1>{winnerName}</h1>
                <div className={classes.winnerGrid}>
                    {rows}
                </div>
            </div>
        )
    }

    // Show declare winner button if needed
    let declareWinner = null
    if (winnerCards.length > 0) {
        declareWinner = (
            <div className={classes.winnerControls}>
                <div className={classes.winnerButton} onClick={togglePlay}>No winner yet!</div>
                <div className={classes.winnerButton} onClick={doDeclareWinner}>Declare winner</div>
            </div>
        )
    }

    return (
        <div className={classes.main}>
            <div className={classes.headerArea}>
                <h1>Admin page</h1>
            </div>
            <div className={classes.roomControls}>
                <h2>Room is: {context.allowPlay ? 'active.' : 'paused'}</h2>
                <label className={classes.switch} onClick={togglePlay}>
                    <input type='checkbox' value='off' />
                    <span className={classes.slider}></span>
                </label>
                {declareWinner}
            </div>
            {winnersInfo}
            {players}
        </div>
    )
}

export default AdminPage