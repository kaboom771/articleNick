import { useParams } from 'react-router-dom'
import { ViewArticleRouteParams } from '../../lib/routes'

export const ViewArticlePage = () => {
  const { articleNick } = useParams() as ViewArticleRouteParams
  return (
    <div>
      <h1>{articleNick}</h1>
      <p>Desciption of article 1...</p>
      <div>
        <p>Text 1 of article 1 ...</p>
        <p>Text 2 of article 1 ...</p>
        <p>Text 3 of article 1 ...</p>
      </div>
    </div>
  )
}
