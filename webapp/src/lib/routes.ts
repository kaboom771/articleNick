const getRouteParams = <T extends Record<string, boolean>>(object: T) => {
  return Object.keys(object).reduce((acc, key) => ({ ...acc, [key]: `:${key}` }), {}) as Record<keyof T, string>
}

export const getAllArticlesRoute = () => '/'

export const viewArticleRouteParams = getRouteParams({ articleNick: true })
export type ViewArticleRouteParams = typeof viewArticleRouteParams
export const getViewArticleRoute = ({ articleNick }: ViewArticleRouteParams) => `/articles/${articleNick}`

export const editArticleRouteParams = getRouteParams({ articleNick: true })
export type EditArticleRouteParams = typeof viewArticleRouteParams
export const getEditArticleRoute = ({ articleNick }: EditArticleRouteParams) => `/articles/${articleNick}/edit`

export const getNewArticleRoute = () => '/articles/new'

export const getSignUpRoute = () => '/sign-up'

export const getSignInRoute = () => '/sign-in'

export const getSignOutRoute = () => '/sign-out'
