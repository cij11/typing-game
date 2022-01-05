import React from 'react'
import { StackWord } from '../types/stack'

interface Props {
    stack: StackWord[]
}

export default class Stack extends React.Component<Props> {
    render() {
        const hiddenStyle = {
            color: '#00000000'
        }

        return (
            <div>
                Stack:
                <ul>
                    {this.props.stack.map((stackWord) => (
                        <li key={stackWord.id}>
                            <div>{stackWord.word}</div>
                            <div>
                                <span>{stackWord.doneCharacters}</span>
                                <span style={hiddenStyle}>
                                    {stackWord.remainingCharacters}
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}
