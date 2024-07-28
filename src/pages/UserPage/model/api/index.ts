import axios from '../../../../axios'

export const loadPostsFN = async (
  userId: string | undefined,
  subType: string | undefined,
  page: string | undefined
) => {
  if (!!userId && !!subType && !!page) {
    return axios.get(
      `/posts/user/${userId}/${subType}?page=${page}&pageSize=${10}`
    )
  }
}

export const loadCommentsFN = async (
  userId: string | undefined,
  page: string | undefined
) => {
  if (!!userId && !!page) {
    return axios.get(`/comments/user/${userId}?page=${page}&pageSize=20`)
  }
}

export const loadFavoritePostsFN = async (
  userId: string | undefined,
  subType: string | undefined,
  page: string | undefined
) => {
  if (!!userId && !!page) {
    return axios.get(
      `/posts/favorites/${subType}/${userId}?page=${page}&pageSize=20`
    )
  }
}

export const loadFavoriteCommentsFN = async (
  userId: string | undefined,
  page: string | undefined
) => {
  if (!!userId && !!page) {
    return axios.get(`/comments/favorites/${userId}?page=${page}&pageSize=20`)
  }
}

export const loadSubsFN = async (
  userId: string | undefined,
  type: string | undefined,
  page: string | undefined
) => {
  if (!!userId && !!type && !!page) {
    return axios.get(
      `/users/subs/${userId}/${type}?page=${page}&pageSize=${10}`
    )
  }
}
