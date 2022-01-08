import React from 'react'

interface AttributeProps {
    scoreTotal: number
    multiplier: number
}

interface Props extends AttributeProps {}

export default class Scores extends React.Component<Props> {
    render() {
        return (
            <div>
                <ul>
                    <li>Level: {}</li>
                    <li>Score: {this.props.scoreTotal}</li>
                    <li>Combo Multiplier: {this.props.multiplier}</li>
                    <li>Combo Clear: {}</li>
                    <li>Combo Tolerance: {}</li>
                </ul>
            </div>
        )
    }
}
