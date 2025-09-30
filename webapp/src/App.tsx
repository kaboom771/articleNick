import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { AppContextProvider } from './lib/ctx'
import * as routes from './lib/routes'
import { TrpcProvider } from './lib/trpc'
import { AllAIrticlesPage } from './pages/articles/AllArticlesPage'
import { EditArticlePage } from './pages/articles/EditIdeaPage'
import { NewArticlePage } from './pages/articles/NewArticlePage'
import { ViewArticlePage } from './pages/articles/ViewArticlePage'
import { SignInPage } from './pages/auth/SignInPage'
import { SignOutPage } from './pages/auth/SignOutPage'
import { SignUpPage } from './pages/auth/SignUpPage'
import { NotFoundPage } from './pages/other/NotFoundPage'
import './styles/global.scss'

export const App = () => {
  return (
    <TrpcProvider>
      <AppContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path={routes.getSignOutRoute()} element={<SignOutPage />} />
            <Route element={<Layout />}>
              <Route></Route>
              <Route path={routes.getSignUpRoute()} element={<SignUpPage />} />
              <Route path={routes.getSignInRoute()} element={<SignInPage />} />
              <Route path={routes.getAllArticlesRoute()} element={<AllAIrticlesPage />} />
              <Route path={routes.getViewArticleRoute(routes.viewArticleRouteParams)} element={<ViewArticlePage />} />
              <Route path={routes.getNewArticleRoute()} element={<NewArticlePage />} />
              <Route path={routes.getEditArticleRoute(routes.editArticleRouteParams)} element={<EditArticlePage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AppContextProvider>
    </TrpcProvider>
  )
}
