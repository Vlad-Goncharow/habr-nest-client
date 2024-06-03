import React, { Dispatch, SetStateAction } from 'react'
import Select, { SingleValue } from 'react-select';
import { SelectOption, ValuesType } from '../../types';
import { males } from '../../utils';

interface GenderSelectProps {
  values: ValuesType
  setValues: Dispatch<SetStateAction<ValuesType>>
  className:string
}

const GenderSelect: React.FC<GenderSelectProps> = ({setValues,values,className}) => {
  const changeGender = (e: SingleValue<SelectOption>) => {
    if (e) {
      setValues((prev: ValuesType) => ({ ...prev, gender: e }));
    }
  }

  return (
    <div className={className}>
      <span>Пол</span>
      <Select
        value={values.gender}
        onChange={changeGender}
        options={males}
      />
    </div>
  )
}

export default GenderSelect