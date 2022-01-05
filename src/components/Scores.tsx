import React from 'react'

export default class Scores extends React.Component {
    render() {
        return (
            <div>
                <ul>
                    <li>Level: {}</li>
                    <li>Score: {}</li>
                    <li>Combo: {}</li>
                    <li>Combo Multiplier: {}</li>
                    <li>Combo Clear: {}</li>
                    <li>Combo Tolerance: {}</li>
                </ul>
            </div>
        )
    }
}
