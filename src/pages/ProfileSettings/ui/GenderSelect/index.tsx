import React, { Dispatch, SetStateAction } from 'react'
import Select, { SingleValue } from 'react-select'
import { SelectOption, ValuesType } from '../../types'
import { darkThemeStyles, lightThemeStyles, males } from '../../utils'
import { useTheme } from 'entities/Theme'
import { useTranslation } from 'react-i18next'

interface GenderSelectProps {
  values: ValuesType
  setValues: Dispatch<SetStateAction<ValuesType>>
  className: { select: string; label: string }
}

const GenderSelect: React.FC<GenderSelectProps> = ({
  setValues,
  values,
  className,
}) => {
  const { t } = useTranslation()
  const changeGender = (e: SingleValue<SelectOption>) => {
    if (e) {
      setValues((prev: ValuesType) => ({ ...prev, gender: e }))
    }
  }

  const { theme } = useTheme()
  const styles = theme === 'dark' ? darkThemeStyles : lightThemeStyles

  const options = males.map((el) => {
    return {
      value: el.value,
      label: t(el.value),
    }
  })

  const value = { ...values.gender, label: t(values.gender.label) }

  return (
    <div className={className.select}>
      <span className={className.label}>{t('userGender')}</span>
      <Select
        value={value}
        onChange={changeGender}
        options={options}
        styles={styles}
      />
    </div>
  )
}

export default GenderSelect
