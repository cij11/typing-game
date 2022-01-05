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
                            <li>{stackWord.word}</li>
                            <li>
                                <span style={hiddenStyle}>
                                    {stackWord.doneCharacters}
                                </span>
                                <span>{stackWord.remainingCharacters}</span>
                            </li>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}
