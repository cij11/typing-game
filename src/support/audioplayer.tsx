import { parseIsMutedFromCookie } from './cookies'

const NUM_SAMPLE_COPIES = 16

export interface NamedClipConfig {
    name: string
    path: string
}

export interface NamedPoolConfig {
    name: string
    paths: string[]
}

export interface Clip {
    audios: HTMLAudioElement[]
    index: number
}

export interface Pool {
    clips: Clip[]
}

interface AudioPlayer {
    clips: Record<string, Clip>
    pools: Record<string, Pool>
    loadClip: (config: NamedClipConfig) => void
    playClip: (clipName: string) => void
    loadPool: (config: NamedPoolConfig) => void
    playPool: (poolName: string) => void
}

export const audioPlayer: AudioPlayer = {
    clips: {},
    pools: {},

    loadClip: function (config: NamedClipConfig) {
        const audios = []
        for (let i = 0; i < NUM_SAMPLE_COPIES; i++) {
            const audio = new Audio(config.path)
            audios.push(audio)
        }

        this.clips[config.name] = {
            audios: audios,
            index: 0
        }
    },

    playClip: function (clipName) {
        if (parseIsMutedFromCookie() === 1) {
            return
        }

        const clip = this.clips[clipName]

        clip.index = (clip.index + 1) % NUM_SAMPLE_COPIES
        clip.audios[clip.index].play()
    },

    loadPool: function (config: NamedPoolConfig) {
        const clips = []
        for (let j = 0; j < config.paths.length; j++) {
            const audios = []
            for (let i = 0; i < NUM_SAMPLE_COPIES; i++) {
                const audio = new Audio(config.paths[j])
                audios.push(audio)
            }
            const clip = {
                audios,
                index: 0
            }
            clips.push(clip)
        }

        this.pools[config.name] = {
            clips
        }
    },

    playPool: function (poolName) {
        if (parseIsMutedFromCookie() === 1) {
            return
        }

        const pool = this.pools[poolName]
        const randomClipIndex = Math.floor(Math.random() * pool.clips.length)

        console.log('playing clips at index: ' + randomClipIndex)

        const clip = pool.clips[randomClipIndex]

        clip.index = (clip.index + 1) % NUM_SAMPLE_COPIES
        clip.audios[clip.index].play()
    }
}
