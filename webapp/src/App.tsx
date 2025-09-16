import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import * as routes from './lib/routes'
import { TrpcProvider } from './lib/trpc'
import { AllAIrticlesPage } from './pages/AllArticlesPage'
import { NewArticlePage } from './pages/NewArticlePage'
import { SignInPage } from './pages/SignInPage'
import { SignUpPage } from './pages/SignUpPage'
import { ViewArticlePage } from './pages/ViewArticlePage'
import './styles/global.scss'

export const App = () => {
  return (
    <TrpcProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route></Route>
            <Route path={routes.getSignUpRoute()} element={<SignUpPage />} />
            <Route path={routes.getSignInRoute()} element={<SignInPage />} />
            <Route path={routes.getAllArticlesRoute()} element={<AllAIrticlesPage />} />
            <Route path={routes.getViewArticleRoute(routes.viewArticleRouteParams)} element={<ViewArticlePage />} />
            <Route path={routes.getNewArticleRoute()} element={<NewArticlePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TrpcProvider>
  )
}
