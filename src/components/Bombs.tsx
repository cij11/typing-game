interface Props {
    bombs: number
}

export default function Bombs(props: Props) {
    const singleBomb = ' ⏎ '
    const bombString = singleBomb.repeat(props.bombs)

    const viewportFontSizeStyle = {
        fontSize: '1.8vh'
    }

    return (
        <div
            style={viewportFontSizeStyle}
            className="uk-padding-small uk-background-secondary uk-padding-remove-top"
        >
            Bombs: {bombString}
        </div>
    )
}
