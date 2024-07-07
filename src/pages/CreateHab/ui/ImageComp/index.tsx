import React, { ChangeEvent } from 'react'
import s from './ImageComp.module.scss'

interface ImageProps{
  setImageFile:any
}

const ImageComp: React.FC<ImageProps> = ({setImageFile}) => {
  const [image, setImage] = React.useState<string>();
  
  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedImage = event.target.files?.[0];
    if (selectedImage) {
      setImageFile(selectedImage)
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(selectedImage);
    }
  }

  return (
    <div className={s.image}>
      <input
        type="file"
        onChange={handleImageUpload}
        className={s.image__upload}
      />
      <img
        src={image ? image : `${process.env.REACT_APP_SERVER_URL}/default.jpg`}
        alt="Картинка Хаба"
        className={s.image__img}
      />
    </div>
  )
}

export default ImageComp