import React from 'react'
import GameOverContainer from '../containers/GameOverContainer'
import { ScoreState } from '../features/score/scoreSlice'
import Options from '../components/Options'
import Stats from '../components/Stats'

interface AttributeProps {
    score: ScoreState
}

interface Props extends AttributeProps {}

export default class Scores extends React.Component<Props> {
    render() {
        return (
            <div>
                <div>
                    <h2>Palavras Rápidas</h2>

                    <ul>
                        <li>Level: {this.props.score.level}</li>
                        <li>Words: {this.props.score.words}</li>
                        <li>Score: {this.props.score.scoreTotal}</li>
                        <li>Combo Multiplier: {this.props.score.multiplier}</li>
                        <li>{this.renderBombs(this.props.score.bombs)}</li>
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
                        isGameOver={this.props.score.isGameOver}
                    />
                </div>
            </div>
        )
    }

    renderBombs(bombs: number) {
        const singleBomb = ' ⏎ '
        const bombString = singleBomb.repeat(bombs)

        return <span>Bombs: {bombString}</span>
    }
}
