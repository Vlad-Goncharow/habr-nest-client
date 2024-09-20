import React from 'react'
import { Helmet } from 'react-helmet'
import { IHab } from 'shared/types/habs'
import FirstStep from '../FirstStep'
import SecondStep from '../SecondStep'
import Sidebar from '../Sidebar'
import { useTranslation } from 'react-i18next'

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
  const {t} = useTranslation()
  const [step, setStep] = React.useState<number>(1)

  const [values, setValues] = React.useState<ValuesType>({
    category: 'develop',
    type: 'articles',
    content: '',
    habs: [],
    image: null,
    title: '',
    difficulty: 'Unknown',
  })

  return (
    <>
      <Helmet>
        <meta charSet='utf-8' />
        <title>{t('publicationsCreate')} / {t('siteTitle')}</title>
        <meta
          name='description'
          content={`${t('publicationsCreate')} / ${t('siteTitle')}`}
        ></meta>
      </Helmet>
      <div className={'wrapper'}>
        <div className={'wrapper__left'}>
          {step === 1 && (
            <FirstStep
              setStep={setStep}
              setValues={setValues}
              values={values}
            />
          )}
          {step === 2 && (
            <SecondStep
              setStep={setStep}
              setValues={setValues}
              values={values}
            />
          )}
        </div>
        <Sidebar />
      </div>
    </>
  )
}

export default CreatePost
