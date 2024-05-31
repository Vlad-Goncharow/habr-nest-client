import React from 'react'
import { IHab } from 'shared/types/habs'
import FirstStep from '../FirstStep'
import SecondStep from '../SecondStep'
import Sidebar from '../Sidebar'

export interface ValuesType {
  title: string
  content: string
  habs: IHab[]
  image: string | null
  category: string
  type: string
  difficulty: string
}

function CreatePost() {
  const [step, setStep] = React.useState<number>(1)

  const [values, setValues] = React.useState<ValuesType>({
    category: 'develop',
    type: 'articles',
    content: '',
    habs: [],
    image: null,
    title: '',
    difficulty: 'Не указано'
  })

  return (
    <div className="page">
      <div className="container">
        <div className={'wrapper'}>
          <div className={'wrapper__left'}>
            {
              step === 1 &&
              <FirstStep setStep={setStep} setValues={setValues} values={values} />
            }
            {
              step === 2 &&
              <SecondStep setStep={setStep} setValues={setValues} values={values} />
            }
          </div>
          <Sidebar />
        </div>
      </div>
    </div>
  )
}

export default CreatePost