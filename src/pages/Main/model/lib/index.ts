import axios from '../../../../axios'

export const loadPostsFN = async (category: string | undefined, type: string | undefined, page:string | undefined) => {
  if(!!category && !!type && !!page){
    return axios.get(`/posts/${category}/${type}/?page=${page}&pageSize=20`)
  }
}

export const loadHabsFN = async (category:string | undefined, title: string | undefined, sort:string | null, order:string | null, page:string | undefined) => {
  if(!!category && !!title && !!sort && !!order && !!page){
    return axios.get(`/habs/search/${category}/${title}?sort=${sort}&order=${order}&page=${page}&pageSize=20`)
  }
}

export const loadAuthorsFN = async (category: string | undefined, title: string | undefined, sort: string | null, order: string | null, page: string | undefined) => {
  if (!!category && !!title &&!!page){
    return axios.get(`/users/authors/${category}/${title}/?sort=${sort}&order=${order}&page=${page}&pageSize=20`)
  }
}