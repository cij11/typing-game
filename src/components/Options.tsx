import React from 'react'
import Cookies from 'js-cookie'
import {
    IS_BELL_MUTED_COOKIE_KEY,
    IS_MUTED_COOKIE_KEY,
    parseIsMutedFromCookie,
    parseIsBellMutedFromCookie
} from '../support/cookies'

interface Props {}

interface State {
    isMuted: number
    isBellMuted: number
}

export default class GameOver extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
            isMuted: parseIsMutedFromCookie(),
            isBellMuted: parseIsBellMutedFromCookie()
        }
    }

    render() {
        return (
            <div className="uk-margin-large uk-margin-remove-left">
                <div>Options</div>
                <div>
                    <input
                        type="checkbox"
                        checked={this.state.isMuted ? true : false}
                        onChange={(e) => this.handleToggleIsMuted(e)}
                    ></input>
                    Mute
                </div>
                <div>
                    <input
                        type="checkbox"
                        checked={this.state.isBellMuted ? true : false}
                        onChange={(e) => this.handleToggleIsBellMuted(e)}
                    ></input>
                    Mute Bell
                </div>
            </div>
        )
    }

    handleToggleIsMuted(e: React.FormEvent<HTMLInputElement>) {
        const toggledIsMuted = 1 - parseIsMutedFromCookie()

        Cookies.set(IS_MUTED_COOKIE_KEY, toggledIsMuted.toString())

        e.currentTarget.blur()

        this.setState({
            isMuted: toggledIsMuted
        })
    }

    handleToggleIsBellMuted(e: React.FormEvent<HTMLInputElement>) {
        const toggledIsMuted = 1 - parseIsMutedFromCookie()

        Cookies.set(IS_BELL_MUTED_COOKIE_KEY, toggledIsMuted.toString())

        e.currentTarget.blur()

        this.setState({
            isBellMuted: toggledIsMuted
        })
    }
}
