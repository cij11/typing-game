import Cookies from 'js-cookie'
import { isUndefined } from 'lodash'

export const IS_MUTED_COOKIE_KEY = 'IS_MUTED'
const HIGH_SCORE_COOKIE_KEY = 'HIGH_SCORE'

export const parseIsMutedFromCookie = () => {
    let currentIsMuted = Cookies.get(IS_MUTED_COOKIE_KEY)
    if (isUndefined(currentIsMuted)) {
        currentIsMuted = '0'
    }

    return parseInt(currentIsMuted)
}

export const getHighScore = () => {
    const highScoreCookieValue = Cookies.get(HIGH_SCORE_COOKIE_KEY)

    const highScore = highScoreCookieValue ? parseInt(highScoreCookieValue) : 0

    return highScore
}

export const setHighScore = (highScore: number) => {
    Cookies.set(HIGH_SCORE_COOKIE_KEY, `${highScore}`)
}
