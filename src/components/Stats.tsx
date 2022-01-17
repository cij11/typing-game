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
                </ul>

                <div>Ranks</div>
                <ul>
                    <li>A {1}</li>
                    <li>B {2}</li>
                    <li>C {3}</li>
                    <li>D {4}</li>
                </ul>
            </div>
        )
    }
}
