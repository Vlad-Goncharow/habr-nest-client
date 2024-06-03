import { fetchModalActions } from 'entities/FetchModal'
import { IUser } from 'entities/User'
import React from 'react'
import { useParams } from 'react-router-dom'
import { postTypeOne } from 'shared/global'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { IHab } from 'shared/types/habs'
import { IPost } from 'shared/types/posts'
import Habs from 'shared/ui/Habs/ui/Habs'
import { PostsList } from 'shared/ui/PostsList'
import { UsersList } from 'shared/ui/UsersList'
import { PostsNavigation } from 'widgets/PostsNavigation'
import axios from '../../../../axios'
import Sidebar from '../SideBar/Main'

function Main() {
  const dispatch = useAppDispatch()
  const { category, type, page } = useParams()

  //habs
  const [sortOptions, setSortOptions] = React.useState({
    sort:'',
    order:'',
  })
  const [habs, setHabs] = React.useState<IHab[] | []>([])
  const [habsLoading, setHabsLoading] = React.useState<boolean>(true)
  const [habsTotalCount, setHabsTotalCount] = React.useState<number>(0)
 

  const loadHabs = async (title:string) => {
    try {
      setHabsLoading(true)
      const { data } = await axios.get(`/habs/search/${category}/${title}?sort=${sortOptions.sort}&order=${sortOptions.order}&page=${page}&pageSize=${20}`)
      setHabs(data.habs);
      setHabsTotalCount(data.length)
      setHabsLoading(false)
    } catch (e) {
      setHabsLoading(false)
      dispatch(fetchModalActions.showModal({ type: 'bad', content: 'Ошибка, попробуйте еще раз!' }))
    }
  }

  
  //authors
  const [authors, setAuthors] = React.useState<IUser[] | []>([])
  const [authorsLoading, setAuthorsLoading] = React.useState<boolean>(true)
  const [authorsTotalCount, setAuthorsTotalCount] = React.useState<number>(0)
  const loadAuthors = async (title: string) => {
    try {
      setAuthorsLoading(true)
      const { data } = await axios.get(`/users/authors/${category}/${title}/?page=${page}&pageSize=${20}`)
      setAuthors(data.authors);
      setAuthorsTotalCount(data.length)
      setAuthorsLoading(false)
    } catch (e) {
      setAuthorsLoading(false)
      dispatch(fetchModalActions.showModal({ type: 'bad', content: 'Ошибка, попробуйте еще раз!' }))
    }
  }
  

  //posts
  const [postsLoading, setPostsLoading] = React.useState(true)
  const [postsTotalCount, setPostsTotalCount] = React.useState<number>(0)
  const [posts, setPosts] = React.useState<IPost[] | []>([])

  const loadPosts = async () => {
    try {
      setPostsLoading(true)
      const { data } = await axios.get(`/posts/${category}/${type}/?page=${page}&pageSize=${20}`)
      setPosts(data.posts);
      setPostsTotalCount(data.length)
      setPostsLoading(false)
    } catch (e) {
      setPostsLoading(false)
      dispatch(fetchModalActions.showModal({ type: 'bad', content: 'Ошибка, попробуйте еще раз!' }))
    }
  }

  React.useEffect(() => {
    if (postTypeOne.find((el) => el.typeEng === type)){
      loadPosts()
    }
  }, [type, page, category])

  return (
    <div className={'wrapper'}>
      <div className="wrapper__left">
        <PostsNavigation
          page={Number(page)}
          loadHabs={loadHabs}
          loadAuthors={loadAuthors}
          sortOptions={sortOptions}
        />


        {
          postTypeOne.find((el) => el.typeEng === type) &&
          <PostsList loading={postsLoading} posts={posts} length={postsTotalCount} navigatePath={`/flows/${category}/${type}`} />
        }
        {
          type === 'habs' &&
          <Habs
            habs={habs}
            habsLoading={habsLoading}
            habsTotalCount={habsTotalCount}
            setSortOptions={setSortOptions}
            navigatePath={`/flows/${category}/${type}`}
          />
        }
        {
          type === 'authors' &&
          <UsersList
            navigatePath={`/flows/${category}/${type}`}
            users={authors}
            usersLoading={authorsLoading}
            usersTotalCount={authorsTotalCount}
          />
        }
      </div>
      <Sidebar />
    </div>
  )
}


export default Main