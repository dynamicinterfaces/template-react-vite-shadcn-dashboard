import { IActionAuth, IStateAuth } from './authTypes'

const authInfoLocalStorage = JSON.parse(localStorage.getItem('auth') || '{}')

// Preview mode: when the sandbox screenshot system navigates to a route with
// ?_preview=1, treat the app as authenticated so screenshots show actual page
// content instead of the login screen. This is opt-in at the app level.
const isPreviewMode = new URLSearchParams(window.location.search).has('_preview')

export const initialState: IStateAuth = {
  isAuthenticated: isPreviewMode || Object.keys(authInfoLocalStorage).length > 0,
  authInfo:
    Object.keys(authInfoLocalStorage).length !== 0
      ? authInfoLocalStorage
      : isPreviewMode
        ? { token: 'preview', user: { id: 'preview' } }
        : undefined
}

export const reducer = (state: IStateAuth, action: IActionAuth): IStateAuth => {
  switch (action.type) {
    case 'login':
      return {
        isAuthenticated: !!action.payload,
        authInfo: action.payload
      }
    case 'logout':
      localStorage.clear()
      return {
        isAuthenticated: false,
        authInfo: undefined
      }
    default:
      return state
  }
}