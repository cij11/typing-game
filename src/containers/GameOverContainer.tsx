import React from 'react'
import { connect } from 'react-redux'
import { resetGame } from '../features/score/scoreSlice'
import GameOver from '../components/GameOver'

interface Props {
    resetScore: () => void
    isGameOver: boolean
}

class GameOverContainer extends React.Component<Props> {
    render() {
        return (
            <GameOver
                isGameOver={this.props.isGameOver}
                resetScore={this.props.resetScore}
            />
        )
    }
}

const mapDispatchToProps = {
    resetScore: resetGame
}

export default connect(null, mapDispatchToProps)(GameOverContainer)
