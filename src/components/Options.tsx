import React from 'react'
import Cookies from 'js-cookie'
import { IS_MUTED_COOKIE_KEY, parseIsMutedFromCookie } from '../support/cookies'

interface Props {}

interface State {
    isMuted: number
}

export default class GameOver extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
            isMuted: parseIsMutedFromCookie()
        }
    }

    render() {
        return (
            <div>
                <div>Options</div>
                <input
                    type="checkbox"
                    checked={this.state.isMuted ? true : false}
                    onChange={(e) => this.handleToggleIsMuted(e)}
                ></input>
                Mute
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
}
