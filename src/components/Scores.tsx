import React from 'react'

interface AttributeProps {
    score: number
}

interface Props extends AttributeProps {}

export default class Scores extends React.Component<Props> {
    render() {
        return (
            <div>
                <ul>
                    <li>Level: {}</li>
                    <li>Score: {this.props.score}</li>
                    <li>Combo: {}</li>
                    <li>Combo Multiplier: {}</li>
                    <li>Combo Clear: {}</li>
                    <li>Combo Tolerance: {}</li>
                </ul>
            </div>
        )
    }
}
