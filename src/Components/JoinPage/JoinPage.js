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
    if (context.socket != null) {
        context.socket.on('name', () => setShowModal(true))
    }

    const doConnect = () => {
        context.doConnect()
    }

    const modalClose = (e) => {
        console.log('Clicked... ', e.target)
        if (e.target.id === 'backing' || e.target.id === 'cancel') {
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
        <div className={classes.modalBack} id='backing' onClick={modalClose}>
            <div className={classes.modalCard}>
                <div className={classes.modalHeader}>
                    <h1>Join in!</h1>
                </div>
                <div className={classes.playerArea}>
                    <h2>Join as player</h2>
                    <input onChange={(e) => setName(e.target.value)} placeholder="Enter your name" />
                    <div className={classes.playerControls}>
                        <div className={`${classes.button} ${classes.cancel}`} id='cancel' onClick={modalClose}>Cancel</div>
                        <div className={classes.button} onClick={modalSubmit}>Join</div>
                    </div>
                </div>
                <div className={classes.adminArea}>
                    <h2>Join as admin</h2>
                    <input type="text" placeholder="Enter admin password" />
                    <div className={classes.adminControls}>
                        <button onClick={joinAsAdmin}>Join as Admin</button>
                    </div>
                </div>
            </div>
        </div>
    )
    if (!showModal) nameModal = false

    return (
        <div className={classes.container}>
            <div className={classes.joinContainer}>
                <div className={classes.titleArea}>
                    <h1 className={classes.zoom}>ZOOM</h1>
                    <h1 className={classes.bingo}>Bingo</h1>
                </div>
                <div className={classes.controls}>
                    <button onClick={doConnect}>Join room</button>
                </div>
            </div>
            {nameModal}
        </div>
    )
}

export default JoinPage