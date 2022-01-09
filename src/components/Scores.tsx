import React from 'react'
import GameOver from './GameOver'

interface AttributeProps {
    scoreTotal: number
    multiplier: number
    isGameOver: boolean
}

interface Props extends AttributeProps {}

export default class Scores extends React.Component<Props> {
    render() {
        return (
            <div>
                <h2>Palavras Rápidas</h2>

                <ul>
                    <li>Level: 1</li>
                    <li>Score: {this.props.scoreTotal}</li>
                    <li>Combo Multiplier: {this.props.multiplier}</li>
                </ul>

                <div>
                    <GameOver isGameOver={this.props.isGameOver} />
                </div>
            </div>
        )
    }
}
