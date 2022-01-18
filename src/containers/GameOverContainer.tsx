import React from 'react'
import { connect } from 'react-redux'
import { resetGame } from '../features/score/scoreSlice'
import GameOver from '../components/GameOver'

interface Props {
    resetGame: () => void
    remount: () => void
    isGameOver: boolean
}

class GameOverContainer extends React.Component<Props> {
    render() {
        return (
            <GameOver
                isGameOver={this.props.isGameOver}
                resetGame={this.props.resetGame}
                remount={this.props.remount}
            />
        )
    }
}

const mapDispatchToProps = {
    resetGame: resetGame
}

export default connect(null, mapDispatchToProps)(GameOverContainer)
