import React from 'react'
import GameOverContainer from '../containers/GameOverContainer'
import { ScoreState } from '../features/score/scoreSlice'
import Options from '../components/Options'
import Stats from '../components/Stats'
import { getHighScore } from '../support/cookies'

interface AttributeProps {
    score: ScoreState

    remount: () => void
}

interface Props extends AttributeProps {}

export default class Scores extends React.Component<Props> {
    render() {
        return (
            <div>
                <div>
                    <h3>Word Prefect</h3>
                    <div>Score: {this.props.score.scoreTotal}</div>
                    <div>High Score: {getHighScore()}</div>
                    <br />

                    <div>Level: {this.props.score.level}</div>
                    <div>Combo Multiplier: {this.props.score.multiplier}</div>
                </div>

                <div>
                    <Stats score={this.props.score} />
                </div>

                <div>
                    <Options />
                </div>

                <div>
                    <GameOverContainer
                        remount={this.props.remount}
                        isGameOver={this.props.score.isGameOver}
                    />
                </div>
            </div>
        )
    }
}
