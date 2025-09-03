const getRouteParams = <T extends Record<string, boolean>>(object: T) => {
  return Object.keys(object).reduce((acc, key) => ({ ...acc, [key]: `:${key}` }), {}) as Record<keyof T, string>
}

export const getAllArticlesRoute = () => '/'

export const viewArticleRouteParams = getRouteParams({ articleNick: true })
export type ViewArticleRouteParams = typeof viewArticleRouteParams
export const getViewArticleRoute = ({ articleNick }: ViewArticleRouteParams) => `/articles/${articleNick}`
