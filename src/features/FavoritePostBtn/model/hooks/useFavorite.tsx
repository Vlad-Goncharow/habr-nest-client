import { getUserData } from 'entities/User'
import React from 'react'
import { useAppSelector } from 'shared/hooks/useAppSelector'
import { IPost } from 'shared/types/posts'

interface useFavoriteProps{
  postId:any
}

const useFavorite = (props: useFavoriteProps):any => {
  const { postId } = props;
  const {user} = useAppSelector(getUserData)
  const [active, setActive] = React.useState(false)

  React.useEffect(() => {
    if(user !== null && user.favoritePosts.find((el:IPost) => el.id === postId)){
      setActive(true)
    } else {
      setActive(false)
    }
  },[postId])

  
  return { active }
}

export default useFavorite