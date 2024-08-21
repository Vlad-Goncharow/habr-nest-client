import { IUser } from 'entities/User'
import React, { ChangeEvent } from 'react'
import s from './ImageUpload.module.scss'

interface ImageUploadProps {
  setImageFile: any
  user: IUser | null
}

const ImageUpload: React.FC<ImageUploadProps> = ({ setImageFile, user }) => {
  const [image, setImage] = React.useState<string>()

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedImage = event.target.files?.[0]
    if (selectedImage) {
      setImageFile(selectedImage)
      const reader = new FileReader()
      reader.onload = () => {
        setImage(reader.result as string)
      }
      reader.readAsDataURL(selectedImage)
    }
  }

  return (
    <div className={s.user}>
      <h4 className={s.user__title}>Аватар</h4>
      <div className={s.user__image}>
        <input
          type='file'
          onChange={handleImageUpload}
          className={s.image__upload}
          accept='image/*'
        />
        <>
          <img
            src={
              image
                ? image
                : `${process.env.REACT_APP_SERVER_URL}/${user?.avatar}`
            }
            alt='Аватар пользователя'
            className={s.image__img}
          />
        </>
      </div>
      <p className={s.user__info}>
        Формат: jpg, gif, png. <br />
        Максимальный размер файла: 1Mb. <br />
        Разрешение: до 96x96px.
      </p>
    </div>
  )
}

export default ImageUpload
