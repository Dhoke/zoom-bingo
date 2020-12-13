import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router'
import { WebSocketContext } from '../../Contexts/WebSocketContext'
import classes from './JoinPage.module.css'


const JoinPage = () => {

    const [showModal, setShowModal] = useState(false)
    const [name, setName] = useState('')
    
    // Used for navigation
    const history = useHistory()

    const context = useContext(WebSocketContext)
    if(context.socket != null) {
        context.socket.on('name', () => setShowModal(true))
    }
    
    const doConnect = () => {
        context.doConnect()
    }

    const modalClose = (e) => {
        if(e.target.id === 'backing' || e.target.id === 'cancel') {
            setShowModal(false)
        }
    }

    const modalSubmit = () => {
        context.socket.emit('giveName', name)
        context.setName(name)
        history.push('/game')
    }

    const joinAsAdmin = () => {
        context.socket.emit('giveName', 'admin')
        history.push('/admin')
    }

    let nameModal = (
        <div className={classes.modalBack} onClick={modalClose}>
            <div className={classes.modalCard}>
                <input onChange={(e) => setName(e.target.value)} placeholder="Enter your name" />
                <button onClick={modalClose}>Cancel</button>
                <button onClick={modalSubmit}>Join</button>
                <button onClick={joinAsAdmin}>Join as Admin</button>
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