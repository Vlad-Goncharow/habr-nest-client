import axios from '../../axios'

export const uploadImage = async (imageFile: File) => {
  const formData = new FormData()
  formData.append('file', imageFile)

  const { data } = await axios.post('/files/upload', formData)
  return data.filename
}
