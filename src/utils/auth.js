import Cookies from 'js-cookie'

const TokenKey = 'kc_game'
const ExpireKey = 'expire_in'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setExpireTime(time) {
  return Cookies.set(ExpireKey, time)
}

export function getExpireTime(time) {
  return Cookies.get(ExpireKey)
}
