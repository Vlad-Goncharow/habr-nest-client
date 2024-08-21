import React, { Dispatch, SetStateAction } from 'react'
import Select, { SingleValue } from 'react-select'
import { SelectOption, ValuesType } from '../../types'
import { darkThemeStyles, lightThemeStyles, males } from '../../utils'
import { useTheme } from 'entities/Theme'

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
  const changeGender = (e: SingleValue<SelectOption>) => {
    if (e) {
      setValues((prev: ValuesType) => ({ ...prev, gender: e }))
    }
  }

  const { theme } = useTheme()
  const styles = theme === 'dark' ? darkThemeStyles : lightThemeStyles

  return (
    <div className={className.select}>
      <span className={className.label}>Пол</span>
      <Select
        value={values.gender}
        onChange={changeGender}
        options={males}
        styles={styles}
      />
    </div>
  )
}

export default GenderSelect
