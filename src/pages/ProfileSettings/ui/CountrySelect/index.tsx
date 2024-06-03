import React, { Dispatch, SetStateAction } from 'react'
import Select, { SingleValue } from 'react-select'
import { SelectOption, ValuesType } from '../../types';
import { countries } from '../../utils';

interface CountrySelectProps{
  values: ValuesType
  setValues: Dispatch<SetStateAction<ValuesType>>
  className: string
}

const CountrySelect: React.FC<CountrySelectProps> = ({className,setValues,values}) => {
  const changeCountry = (e: SingleValue<SelectOption>) => {
    if (e) {
      setValues((prev: ValuesType) => ({ ...prev, country: e }));
    }
  }


  return (
    <div className={className}>
      <span>Страна</span>
      <Select
        value={values.country}
        onChange={changeCountry}
        options={countries}
      />
    </div>
  )
}

export default CountrySelect