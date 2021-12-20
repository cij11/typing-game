const NUM_SAMPLE_COPIES = 8

export interface NamedClipConfig {
    name: string
    path: string
}

export interface NamedPoolConfig {
    name: string
    paths: string[]
}

interface AudioPlayer {
    clips: Record<string, HTMLAudioElement[]>
    loadClip: (config: NamedClipConfig) => void
    playClip: (clipName: string) => void
    index: number
}

export const audioPlayer: AudioPlayer = {
    index: 0,

    clips: {},

    loadClip: function (config: NamedClipConfig) {
        const newClips = []
        for (let i = 0; i < NUM_SAMPLE_COPIES; i++) {
            const audio = new Audio(config.path)
            newClips.push(audio)
        }

        this.clips[config.name] = newClips
    },

    playClip: function (clipName) {
        this.index = (this.index + 1) % NUM_SAMPLE_COPIES

        this.clips[clipName][this.index].play()
    }
}
