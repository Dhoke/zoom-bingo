import React, { useState, useEffect } from 'react'
import socketIOClient from "socket.io-client"

export const WebSocketContext = React.createContext()

const ENDPOINT = "http://127.0.0.1:4001"


const WebSocketContextProvider = (props) => {

    const [socket, setSocket] = useState(null)
    const [allowPlay, setAllowPlay] = useState(true)
    const [name, setName] = useState('')
    const [players, setPlayers] = useState([])
    const [winner, setWinner] = useState(null)

    useEffect(() => {
        if (socket == null) return
        return () => socket.disconnect()
    }, [socket])

    const doConnect = () => {
        const ws = socketIOClient(ENDPOINT)
        ws.on('hello', ({roomIsPaused, players}) => {
            console.log('Players: ', players)
            setAllowPlay(!roomIsPaused)
            setPlayers(players)
        })
        ws.on('players', (players) => setPlayers(players))
        ws.on('stop', () => setAllowPlay(false))
        ws.on('start', () => setAllowPlay(true))
        ws.on('winner', (msg) => setWinner(msg))
        setSocket(ws)
    }

    const doTogglePlay = () => {
        if(allowPlay) {
            socket.emit('pauseGame')
        } else {
            socket.emit('startGame')
        }
    }

    const doDeclareWinner = (name) => {
        socket.emit('winnerChosen', name)
    }

    return (
        <WebSocketContext.Provider value={{
            doConnect,
            doTogglePlay,
            doDeclareWinner,
            setName,

            socket,
            allowPlay,
            name,
            players,
            winner,
        }}>
            {props.children}
        </WebSocketContext.Provider>
    )
}

export default WebSocketContextProvider