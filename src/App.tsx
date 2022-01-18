import React, { useState } from 'react'
import GameLauncherContainer from './containers/GameLauncher'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import GameContainer from './containers/GameContainer'

function App() {
    const [gameId, setGameId] = useState(1)

    function remount() {
        setGameId(gameId + 1)
        console.log('new gameid', gameId)
    }

    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route
                        path="/typing-game"
                        element={<GameLauncherContainer />}
                    ></Route>
                    <Route
                        path="/typing-game/game"
                        element={
                            <GameContainer key={gameId} remount={remount} />
                        }
                    ></Route>
                </Routes>
            </Router>
        </div>
    )
}

export default App
