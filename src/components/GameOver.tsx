import React from 'react'

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
            <div className="uk-padding-large uk-padding-remove-left">
                <h3>Game Over</h3>
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
