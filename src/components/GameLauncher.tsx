import React from 'react'
import { Link } from 'react-router-dom'

export default class GameLauncher extends React.Component {
    render() {
        return (
            <div>
                <div>Main Menu</div>
                <div>Click 'Start Game' to begin</div>
                <Link to="/game">Start Game</Link>
            </div>
        )
    }
}
