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
                <br />
                <div>
                    Words Per Minute:{' '}
                    {Math.round(this.props.score.wordsPerMinute)}
                </div>
                <div>Longest Combo: {this.props.score.longestCombo}</div>
                <br />
                <div>
                    <div>Rank A - {this.props.score.a}</div>
                    <div>Rank B - {this.props.score.b}</div>
                    <div>Rank C - {this.props.score.c}</div>
                    <div>Rank D - {this.props.score.d}</div>
                </div>
                <br />
            </div>
        )
    }
}
