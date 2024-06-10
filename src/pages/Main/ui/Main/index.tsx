import React from 'react'
import { useParams } from 'react-router-dom'
import { postTypeOne } from 'shared/global'
import Authors from '../Authors'
import Habs from '../Habs'
import Posts from '../Posts'
import PostsNavigation from '../PostsNavigation'
import Sidebar from '../SideBar/Main'

function Main() {
  const { type } = useParams()
  
  const [habsTitle, setHabsTitle] = React.useState('all')
  const [authorsTitle, setAuthorsTitle] = React.useState('all')
  return (
    <div className={'wrapper'}>
      <div className="wrapper__left">
        <PostsNavigation setAuthorsTitle={setAuthorsTitle} setHabsTitle={setHabsTitle} />

        {
          postTypeOne.find((el) => el.typeEng === type) &&
          <Posts />
        }
        {
          type === 'habs' &&
          <Habs title={habsTitle} />
        }
        {
          type === 'authors' &&
          <Authors title={authorsTitle} />
        }  
      </div>
      <Sidebar />
    </div>
  )
}


export default Main