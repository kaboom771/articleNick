import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { getAllArticlesRoute, GetViewArticleRoute } from './lib/routes'
import { TrpcProvider } from './lib/trpc'
import { AllAIrticlesPage } from './pages/AllArticlesPage'
import { ViewArticlePage } from './pages/ViewArticlePage'

export const App = () => {
  return (
    <TrpcProvider>
      <BrowserRouter>
        <Routes>
          <Route path={getAllArticlesRoute()} element={<AllAIrticlesPage />} />
          <Route path={GetViewArticleRoute({ articleNick: ':ideaNick' })} element={<ViewArticlePage />} />
        </Routes>
      </BrowserRouter>
    </TrpcProvider>
  )
}
