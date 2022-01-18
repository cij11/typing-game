import React from 'react'
import { Link } from 'react-router-dom'

export default class GameLauncher extends React.Component {
    render() {
        const hiddenStyle = {
            color: '#00000000'
        }

        const dummyList = Array.from(Array(12).keys())
        return (
            <div>
                <div className="uk-container-large uk-flex">
                    <div className="uk-width-1-2 uk-card uk-card-secondary uk-card-body">
                        <div>
                            <ul className="uk-list ">
                                {dummyList.map((dummy, i) => {
                                    return (
                                        <li key={i}>
                                            <ul className="uk-list">
                                                <li style={hiddenStyle}>.</li>
                                                <li style={hiddenStyle}>
                                                    <span>.</span>
                                                    <span>.</span>
                                                </li>
                                            </ul>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                    <div className="uk-width-1-2 uk-card uk-card-primary uk-card-body">
                        <h2>Word Prefect</h2>
                        <h3>Rules</h3>
                        <p>
                            <ul className="uk-list uk-list-divider">
                                <li>
                                    Type words as they appear. If there are
                                    multiple words available, start typing that
                                    word to chose it
                                </li>
                                <li>
                                    Finish words without making mistakes
                                    multiply your score for completing words.
                                    Making a mistake resets your multiplier.
                                </li>
                                <li>Press Enter or Return to use a bomb</li>
                                <li>
                                    The game is over when your word stack is
                                    full
                                </li>
                                <li>Click 'Start Game' to begin</li>
                            </ul>
                        </p>
                        <div className="uk-flex uk-flex-center uk-padding">
                            <Link
                                className="uk-button uk-button-default"
                                to="/typing-game/game"
                            >
                                Start Game
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="uk-section uk-section-secondary"></div>
            </div>
        )
    }
}
