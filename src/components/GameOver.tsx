import React from 'react'
import { Link } from 'react-router-dom'

interface Props {
    isGameOver: boolean
}

export default class GameOver extends React.Component<Props> {
    render() {
        if (!this.props.isGameOver) {
            return null
        }

        return (
            <div>
                <div>Game Over</div>
                <div>
                    <Link to="/">Main Menu</Link>
                </div>
            </div>
        )
    }
}
