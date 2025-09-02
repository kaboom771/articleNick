import { useParams } from 'react-router-dom'

export const ViewArticlePage = () => {
  const { articleNick } = useParams() as { articleNick: string }
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
