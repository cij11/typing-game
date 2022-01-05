import React from 'react'
import GameContainer from './containers/Game'
import GameLauncherContainer from './containers/GameLauncher'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import GameContainer2 from './containers/GameContainer2'

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<GameLauncherContainer />}></Route>
                    <Route path="/game" element={<GameContainer2 />}></Route>
                </Routes>
            </Router>
        </div>
    )
}

export default App
