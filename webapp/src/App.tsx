import { TrpcProvider } from "./lib/trpc"
import { AllAIrticlesPage } from "./pages/AllArticlesPage"



export const App = () => {
  return (
    <TrpcProvider>
      <AllAIrticlesPage />
    </TrpcProvider>
  )
}
