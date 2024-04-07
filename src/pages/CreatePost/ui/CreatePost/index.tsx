import React from 'react'
import { IHab } from 'shared/types/habs'
import FirstStep from '../FirstStep'
import SecondStep from '../SecondStep'
import s from './CreatePost.module.scss'

export interface valuesType {
  title: string
  content: string
  habs: IHab[]
  image: any
  category: string
  type: string
  difficulty: string
}

function CreatePost() {
  const [step, setStep] = React.useState<number>(1)

  const [values, setValues] = React.useState<valuesType>({
    category: 'develop',
    type: 'articles',
    content: '',
    habs: [],
    image: null,
    title: '',
    difficulty: 'unknown'
  })

  return (
    <div className="page">
      <div className="container">
        <div className={s.wrapper}>
          {
            step === 1 &&
            <FirstStep setStep={setStep} setValues={setValues} values={values} />
          }
          {
            step === 2 &&
            <SecondStep setStep={setStep} setValues={setValues} values={values} />
          }
          <div className={s.wrapper__left}></div>
        </div>
      </div>
    </div>
  )
}

export default CreatePost