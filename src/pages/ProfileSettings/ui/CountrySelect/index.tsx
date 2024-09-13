import { useTheme } from 'entities/Theme'
import React, { Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import Select, { SingleValue } from 'react-select'
import { SelectOption, ValuesType } from '../../types'
import { countries, darkThemeStyles, lightThemeStyles } from '../../utils'

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
  const { t } = useTranslation()
  const changeCountry = (e: SingleValue<SelectOption>) => {
    if (e) {
      setValues((prev: ValuesType) => ({ ...prev, country: e }))
    }
  }

  const { theme } = useTheme()
  const styles = theme === 'dark' ? darkThemeStyles : lightThemeStyles

  const options = countries.map((el) => {
    return {
      value: el.value,
      label: t(el.value),
    }
  })

  const value = { ...values.country, label: t(values.country.label) }

  return (
    <div className={className.select}>
      <span className={className.label}>{t('userCounrty')}</span>
      <Select
        value={value}
        onChange={changeCountry}
        options={options}
        styles={styles}
      />
    </div>
  )
}

export default CountrySelect
