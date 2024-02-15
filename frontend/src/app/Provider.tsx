import { createContext } from "react"



export const AppContext = createContext({});

export const reducers = {
    player: playerContext,
    gameSession: gameContext,
}

export const Provider = ({ children }) => {
    return (
        <AppContext.Provider value={reducers}>
            {children}
        </AppContext.Provider>
    )
}