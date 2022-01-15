import React from 'react'
import { StackWord } from '../types/stack'
import { STACK_LIMIT } from '../containers/GameContainer2'

interface Props {
    stack: StackWord[]
}

export default class Stack extends React.Component<Props> {
    render() {
        const hiddenStyle = {
            color: '#00000000'
        }

        const dummyList = Array.from(
            Array(STACK_LIMIT - this.props.stack.length).keys()
        )

        const reversedStack = [...this.props.stack].reverse()

        return (
            <div>
                <ul className="uk-list uk-list-striped">
                    {
                        // dummy elements to fill the remaining rows
                    }
                    {dummyList.map((dummy, i) => (
                        <li key={`${i}-n/a`}>
                            <ul className="uk-list"></ul>
                            <li style={hiddenStyle}> .</li>

                            <li style={hiddenStyle}> .</li>
                        </li>
                    ))}
                    {reversedStack.map((stackWord) => (
                        <li key={`${stackWord.id}-${stackWord.isActive}`}>
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
                </ul>
            </div>
        )
    }
}
