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
                    <h2>Word Prefect</h2>
                    <div className="uk-flex uk-flex-between">
                        <span>Score: {this.props.score.scoreTotal}</span>
                        <span>High Score: {getHighScore()}</span>
                    </div>
                    <ul>
                        <li>Level: {this.props.score.level}</li>
                        <li>Words: {this.props.score.words}</li>

                        <li>Combo Multiplier: {this.props.score.multiplier}</li>
                    </ul>
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
