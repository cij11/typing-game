import React from 'react'
import { Link } from 'react-router-dom'

interface Props {
    isGameOver: boolean
    resetScore: () => void
}

export default class GameOver extends React.Component<Props> {
    render() {
        if (!this.props.isGameOver) {
            return null
        }

        return (
            <div>
                <div>Game Over</div>
                <button
                    onClick={() => window.location.reload()}
                    className="uk-button uk-button-default"
                >
                    Restart Game
                </button>
            </div>
        )
    }
}
