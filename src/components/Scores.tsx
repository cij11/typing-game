import React from 'react'
import { ScoreState } from '../features/score/scoreSlice'
import GameOver from './GameOver'

interface AttributeProps {
    score: ScoreState
    isGameOver: boolean
}

interface Props extends AttributeProps {}

export default class Scores extends React.Component<Props> {
    render() {
        return (
            <div>
                <h2>Palavras Rápidas</h2>

                <ul>
                    <li>Level: {this.props.score.level}</li>
                    <li>Words: {this.props.score.words}</li>
                    <li>Score: {this.props.score.scoreTotal}</li>
                    <li>Combo Multiplier: {this.props.score.multiplier}</li>
                </ul>

                <div>
                    <GameOver isGameOver={this.props.isGameOver} />
                </div>
            </div>
        )
    }
}
