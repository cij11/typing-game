import React from 'react'

interface Props {
    isGameOver: boolean
    resetGame: () => void
    remount: () => void
}

export default class GameOver extends React.Component<Props> {
    render() {
        if (!this.props.isGameOver) {
            return null
        }

        return (
            <div>
                <h3>Game Over</h3>
                <button
                    onClick={() => {
                        this.props.resetGame()
                        this.props.remount()
                    }}
                    className="uk-button uk-button-default"
                >
                    Restart Game
                </button>
            </div>
        )
    }
}
