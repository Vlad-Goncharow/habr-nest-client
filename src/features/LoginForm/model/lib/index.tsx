import { unwrapResult } from '@reduxjs/toolkit';
import { AuthLoginError, FormLogin, fetchLogin } from 'entities/User';
import React from 'react';
import { useAppDispatch } from 'shared/hooks/useAppDispatch';

const UseLogin = () => {
  const dispatch = useAppDispatch()

  const [isSuccess, setIsSuccess] = React.useState<boolean>(false)
  const [error, setError] = React.useState<AuthLoginError>()
  const [data, setData] = React.useState<any>()

  const loginSubmit = async (data: FormLogin) => {
    try {
      const resultAction = await dispatch(fetchLogin(data));
      if (fetchLogin.fulfilled.match(resultAction)) {
        const data = unwrapResult(resultAction);
        setIsSuccess(true)
        setData(data)
      } else {
        const myError = resultAction.payload as AuthLoginError;
        setError({ param:myError.param, message: myError.message });
        setIsSuccess(false)
      }
    } catch (e) {
      setIsSuccess(false)
    }
  };

  return { loginSubmit, error, isSuccess,data }
}

export default UseLogin