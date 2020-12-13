import React from 'react'

export const GameContext = React.createContext()

const GameContextProvider = (props) => {

    return (
        <GameContext.Provider value={{}}>
            {props.children}
        </GameContext.Provider>
    )
}

export default GameContextProvider