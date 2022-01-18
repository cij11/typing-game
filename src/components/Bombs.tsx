interface Props {
    bombs: number
}

export default function Bombs(props: Props) {
    const singleBomb = ' ⏎ '
    const bombString = singleBomb.repeat(props.bombs)

    return (
        <div className="uk-padding-small uk-background-secondary uk-padding-remove-top">
            Bombs: {bombString}
        </div>
    )
}
