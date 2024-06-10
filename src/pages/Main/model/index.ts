import axios from '../../../axios'

export const loadHabsFN = async (category:any, title: any, sort:any, order:any, page:any) => {
  return axios.get(`/habs/search/${category}/${title}?sort=${sort}&order=${order}&page=${page}&pageSize=20`)
}

export const loadAuthorsFN = async (category: any, title: any, page: any) => {
  return axios.get(`/users/authors/${category}/${title}/?page=${page}&pageSize=20`)
}