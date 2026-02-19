import { IActionAuth, IStateAuth } from './authTypes'

const isPreviewMode = import.meta.env.VITE_PREVIEW_MODE === 'true'

const authInfoLocalStorage = JSON.parse(localStorage.getItem('auth') || '{}')

const previewAuthInfo = {
  token: 'preview-token',
  user: {
    email: 'preview@dynamicinterfaces.com',
    username: 'Preview User'
  }
}

export const initialState: IStateAuth = {
  isAuthenticated: isPreviewMode || Object.keys(authInfoLocalStorage).length > 0,
  authInfo: isPreviewMode
    ? previewAuthInfo
    : Object.keys(authInfoLocalStorage).length !== 0
      ? authInfoLocalStorage
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
