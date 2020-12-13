import React, { useState } from 'react'
import classes from './BingoCard.module.css'

const BingoCard = (props) => {

    const [marked, setMarked] = useState(props.marked || false)
    const toggleMarked = () => setMarked(!marked)

    const doUpdate = () => {
        if(props.editable) {
            props.onUpdate(props.i, props.j, marked ? 0 : 1)
            toggleMarked()
        }
    }

    let styles = classes.card
    if(marked) {
        styles = styles + ` ${classes.clicked}`
    }

    return (
        <div className={styles} onClick={doUpdate}>
            {props.text}
        </div>
    )
}

export default BingoCard