import { unwrapResult } from '@reduxjs/toolkit'
import { AuthRegisterError, FormRegister, fetchRegister } from 'entities/User'
import React from 'react'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'

const UseRegister = () => {
  const dispatch = useAppDispatch()

  const [isSuccess, setIsSuccess] = React.useState<boolean>(false)
  const [error, setError] = React.useState<any>()
  const [data, setData] = React.useState<any>()

  const registerSubmit = async (values: FormRegister) => {
    try {
      const resultAction = await dispatch(fetchRegister(values))
      if (fetchRegister.fulfilled.match(resultAction)) {
        const data = unwrapResult(resultAction)
        setIsSuccess(true)
        setData(data)
      } else {
        const myError = resultAction.payload as AuthRegisterError
        setError({ param: myError.param, message: myError.message })
        setIsSuccess(false)
      }
    } catch (e) {
      setIsSuccess(false)
    }
  }

  return { registerSubmit, error, isSuccess, data }
}

export default UseRegister
