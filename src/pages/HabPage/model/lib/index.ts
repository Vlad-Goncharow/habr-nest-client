import axios from '../../../../axios'

export const loadPostsFN = async (habId: string | undefined, type: string | undefined, page:string | undefined) => {
  if (!!habId && !!page && !!page){
    return axios.get(`/posts/hab/${habId}/${type}?page=${page}&pageSize=20`)
  }
}

export const loadAuthorsFN = async (habId: string | undefined, sort: string | null, order: string | null, page: string | undefined) => {
  if (!!habId && !!page){
    return axios.get(`/habs/load/${habId}/authors?sort=${sort}&order=${order}&page=${page}&pageSize=20`)
  }
}