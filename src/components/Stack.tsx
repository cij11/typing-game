import React from 'react'
import { StackWord } from '../types/stack'
import { STACK_LIMIT } from '../containers/GameContainer'

interface Props {
    stack: StackWord[]
    nextWord: string
}

export default class Stack extends React.Component<Props> {
    render() {
        const hiddenStyle = {
            color: '#00000000'
        }

        const dummyList = Array.from(
            Array(STACK_LIMIT - this.props.stack.length).keys()
        )

        return (
            <div>
                <ul className="uk-list uk-list-striped">
                    {
                        // dummy elements to fill the remaining rows
                    }
                    {this.props.stack.map((stackWord) => (
                        <li
                            key={`${stackWord.id}-${stackWord.isActive}`}
                            className="uk-padding-remove-top uk-padding-remove-bottom"
                        >
                            <ul className="uk-list"></ul>
                            <li>{stackWord.word}</li>
                            {1 && (
                                <li
                                    className={
                                        stackWord.isActive
                                            ? 'uk-background-primary'
                                            : ''
                                    }
                                >
                                    <span>{stackWord.doneCharacters}</span>
                                    <span style={hiddenStyle}>
                                        {stackWord.remainingCharacters}
                                    </span>
                                </li>
                            )}
                        </li>
                    ))}
                    <li
                        style={{ background: 'black' }}
                        className="uk-padding-remove-top uk-padding-remove-bottom"
                    >
                        <ul className="uk-list">
                            <li
                                style={{ color: '#777777' }}
                                className="uk-flex"
                            >
                                <div
                                    className="uk-width-2-3"
                                    style={{ color: '#777777' }}
                                >
                                    {this.props.nextWord}
                                </div>
                                <div className="uk-width-1-3 uk-text-right">
                                    {`<< NEXT`}
                                </div>
                            </li>
                        </ul>

                        <li style={hiddenStyle}> .</li>
                    </li>
                    {dummyList.map((dummy, i) => (
                        <li
                            key={`${i}-n/a`}
                            className="uk-padding-remove-top uk-padding-remove-bottom"
                        >
                            <ul className="uk-list"></ul>
                            <li style={hiddenStyle}> .</li>

                            <li style={hiddenStyle}> .</li>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}
