import { Link, Outlet } from 'react-router-dom'
import { getAllArticlesRoute } from '../../lib/routes'

export const Layout = () => {
  return (
    <div>
      <p>
        <b>ArticleNick</b>
      </p>
      <ul>
        <li>
          <Link to={getAllArticlesRoute()}>All Articles</Link>
        </li>
      </ul>
      <hr />
      <div>
        <Outlet />
      </div>
    </div>
  )
}
