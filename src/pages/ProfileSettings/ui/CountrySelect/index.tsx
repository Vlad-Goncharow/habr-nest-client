import React, { Dispatch, SetStateAction } from 'react'
import Select, { SingleValue } from 'react-select'
import { SelectOption, ValuesType } from '../../types'
import { countries, darkThemeStyles, lightThemeStyles } from '../../utils'
import { useTheme } from 'entities/Theme'

interface CountrySelectProps {
  values: ValuesType
  setValues: Dispatch<SetStateAction<ValuesType>>
  className: { select: string; label: string }
}

const CountrySelect: React.FC<CountrySelectProps> = ({
  className,
  setValues,
  values,
}) => {
  const changeCountry = (e: SingleValue<SelectOption>) => {
    if (e) {
      setValues((prev: ValuesType) => ({ ...prev, country: e }))
    }
  }

  const { theme } = useTheme()
  const styles = theme === 'dark' ? darkThemeStyles : lightThemeStyles

  return (
    <div className={className.select}>
      <span className={className.label}>Страна</span>
      <Select
        value={values.country}
        onChange={changeCountry}
        options={countries}
        styles={styles}
      />
    </div>
  )
}

export default CountrySelect
