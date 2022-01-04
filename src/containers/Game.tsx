import React from 'react'
import Game from '../components/Game'
import { WordLists, WordProgress } from '../types/encounter'
import {
    encounterContentFactory,
    wordListsFactory as wordListFactory,
    wordListWordCompletor,
    wordListWordSelector,
    wordProgressFactory,
    wordProgressCharacterCompletor,
    pickAvailableWords,
    wordProgressWrongCharacter
} from '../factories/encounter'
import { audioPlayer } from '../support/audioplayer'

interface Props {}

interface State {
    wordProgress: WordProgress | null
    wordLists: WordLists
}

audioPlayer.loadClip({ name: 'bell', path: '/bell.mp3' })
audioPlayer.loadPool({
    name: 'keyhit',
    paths: ['keystrike1.mp3', 'keystrike2.mp3', 'keystrike3.mp3']
})
audioPlayer.loadPool({
    name: 'keymiss',
    paths: ['mistype1.mp3', 'mistype2.mp3']
})

export default class GameContainer extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)

        const encounterContent = encounterContentFactory({ numWords: 4 })
        const wordLists = pickAvailableWords(wordListFactory(encounterContent))

        this.state = {
            wordProgress: null,
            wordLists: wordLists
        }
    }

    render() {
        const { wordProgress, wordLists: encounterProgress } = this.state

        return (
            <div onKeyDown={() => this.handleKeyDown}>
                <Game
                    wordProgress={wordProgress}
                    encounterProgress={encounterProgress}
                    onKeyDown={this.handleKeyDown}
                />
            </div>
        )
    }

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown)
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown)
    }

    handleKeyDown = (e: any) => {
        console.log('handling keydown')
        console.log(e.key)

        if (this.state.wordProgress === null) {
            this.handleTrySelectWord(e.key)
        }

        if (this.state.wordProgress !== null) {
            this.handleTryProgressWord(e.key)
        }
    }

    handleTrySelectWord(key: string) {
        const availableWordsStartingWithKey =
            this.state.wordLists.availableWords.filter((word) =>
                word.startsWith(key)
            )

        console.log(
            'availableWordsStartingWithKey',
            availableWordsStartingWithKey
        )

        if (availableWordsStartingWithKey.length !== 0) {
            this.selectWord(availableWordsStartingWithKey[0])
        }
    }

    selectWord(word: string) {
        this.setState({
            wordProgress: wordProgressFactory(word),
            wordLists: wordListWordSelector(this.state.wordLists, word)
        })
    }

    completeWord(wordProgress: WordProgress) {
        this.setState({
            wordProgress: null,
            wordLists: pickAvailableWords(
                wordListWordCompletor(this.state.wordLists, wordProgress)
            )
        })
    }

    progressWord(wordProgress: WordProgress) {
        this.setState({
            wordProgress
        })
    }

    handleTryProgressWord(key: string) {
        // Correct key press
        if (!this.state.wordProgress) {
            console.error('Tried to progress word, but no word in progress')
        } else if (key === this.state.wordProgress.remainingCharacters[0]) {
            audioPlayer.playPool('keyhit')
            const wordProgress = wordProgressCharacterCompletor(
                this.state.wordProgress
            )

            if (wordProgress.remainingCharacters.length === 0) {
                audioPlayer.playClip('bell')
                this.completeWord(wordProgress)
            } else {
                this.progressWord(wordProgress)
            }

            return
        } else {
            const wordProgress = wordProgressWrongCharacter(
                this.state.wordProgress
            )
            this.progressWord(wordProgress)
            audioPlayer.playPool('keymiss')
        }
    }
}
