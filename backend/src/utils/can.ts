import type { Article, User, UserPermission } from '@prisma/client'

type MaybeUser = Pick<User, 'permissions' | 'id'> | null
type MaybeArticle = Pick<Article, 'authorId'> | null

const hasPermission = (user: MaybeUser, permission: UserPermission) => {
  return user?.permissions.includes(permission) || user?.permissions.includes('ALL') || false
}

export const canBlockArticles = (user: MaybeUser) => {
  return hasPermission(user, 'BLOCK_ARTICLES')
}

export const canEditArticle = (user: MaybeUser, article: MaybeArticle) => {
  return !!user && !!article && user?.id === article?.authorId
}
