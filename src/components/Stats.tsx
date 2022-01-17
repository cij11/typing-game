import React from 'react'
import { ScoreState } from '../features/score/scoreSlice'

interface AttributeProps {
    score: ScoreState
}

interface Props extends AttributeProps {}

export default class Stats extends React.Component<Props> {
    render() {
        return (
            <div>
                <ul>
                    <li>
                        Words Per Minute:{' '}
                        {Math.round(this.props.score.wordsPerMinute)}
                    </li>
                    <li>Longest Combo: {this.props.score.longestCombo}</li>
                </ul>

                <div>Word Ranks</div>
                <ul>
                    <li>A: {this.props.score.a}</li>
                    <li>B: {this.props.score.b}</li>
                    <li>C: {this.props.score.c}</li>
                    <li>D: {this.props.score.d}</li>
                </ul>
            </div>
        )
    }
}
