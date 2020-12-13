import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import socketIOClient from "socket.io-client"
import classes from './JoinPage.module.css'

const ENDPOINT = "http://127.0.0.1:4001"

const JoinPage = () => {

    const [showModal, setShowModal] = useState(false)
    const [name, setName] = useState('')
    const [socket, setSocket] = useState(null)
    
    // Used for navigation
    const history = useHistory()

    useEffect(() => {      
        if(socket == null) return 
        return () => socket.disconnect()
    }, [socket])
    
    const doConnect = () => {
        const ws = socketIOClient(ENDPOINT)
        ws.on('name', () => setShowModal(true))

        setSocket(ws)
    }

    const modalClose = (e) => {
        if(e.target.id === 'backing' || e.target.id === 'cancel') {
            setShowModal(false)
        }
    }

    const modalSubmit = () => {
        socket.emit('giveName', name)
        history.push('/game')
    }

    let nameModal = (
        <div className={classes.modalBack} onClick={modalClose}>
            <div className={classes.modalCard}>
                <input onChange={(e) => setName(e.target.value)} placeholder="Enter your name" />
                <button onClick={modalClose}>Cancel</button>
                <button onClick={modalSubmit}>Join</button>
            </div>
        </div>
    )
    if(!showModal) nameModal = false

    return (
        <div>
            <button onClick={doConnect}>Join room</button>
            {nameModal}
        </div>
    )
}

export default JoinPage