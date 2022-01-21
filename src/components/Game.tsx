import React, { KeyboardEvent } from 'react'
import { StackWord } from '../types/stack'
import Scores from './Scores'
import Stack from './Stack'
import { ScoreState } from '../features/score/scoreSlice'
import Bombs from './Bombs'

interface Props {
    stack: StackWord[]
    activeWordId: number | null
    score: ScoreState
    nextWord: string

    remount: () => void
    onKeyDown: (e: KeyboardEvent) => void
}

export default class Game extends React.Component<Props> {
    render() {
        let borderColor = '#000000'

        if (this.props.stack.length > 7) {
            borderColor = '#FF5F00'
        }

        if (this.props.stack.length > 9) {
            borderColor = '#FF0000'
        }

        const borderStyle = {
            borderStyle: 'solid',
            borderColor: borderColor,
            borderWidth: '5px'
        }

        return (
            <div onKeyDown={this.props.onKeyDown}>
                <div className="uk-container-large uk-flex">
                    <div
                        style={borderStyle}
                        className="uk-width-1-2 uk-card uk-card-secondary uk-card-body uk-padding-small"
                    >
                        <Bombs bombs={this.props.score.bombs} />
                        <div>
                            <Stack
                                stack={this.props.stack}
                                nextWord={this.props.nextWord}
                            />
                        </div>
                    </div>

                    <div className="uk-width-1-2 uk-card uk-card-primary uk-card-body">
                        <Scores
                            score={this.props.score}
                            remount={this.props.remount}
                        />
                    </div>
                </div>
                <div className="uk-section uk-section-secondary uk-height-1-1"></div>
            </div>
        )
    }
}
