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
  
  return (
    <div className={'wrapper'}>
      <div className="wrapper__left">
        <PostsNavigation />

        {
          postTypeOne.find((el) => el.typeEng === type) &&
          <Posts />
        }
        {
          type === 'habs' &&
          <Habs />
        }
        {
          type === 'authors' &&
          <Authors />
        }  
      </div>
      <Sidebar />
    </div>
  )
}


export default Main