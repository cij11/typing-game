import React from 'react'
import GameLauncherContainer from './containers/GameLauncher'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import GameContainer from './containers/GameContainer'

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<GameLauncherContainer />}></Route>
                    <Route path="/game" element={<GameContainer />}></Route>
                </Routes>
            </Router>
        </div>
    )
}

export default App
