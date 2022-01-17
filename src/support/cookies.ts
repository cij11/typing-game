import Cookies from 'js-cookie'
import { isUndefined } from 'lodash'

export const IS_MUTED_COOKIE_KEY = 'IS_MUTED'

export const parseIsMutedFromCookie = () => {
    let currentIsMuted = Cookies.get(IS_MUTED_COOKIE_KEY)
    if (isUndefined(currentIsMuted)) {
        currentIsMuted = '0'
    }

    return parseInt(currentIsMuted)
}
