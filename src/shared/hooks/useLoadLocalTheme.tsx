import React from 'react'

function useLoadLocalTheme() {
  const localTheme = localStorage.getItem('theme')
  React.useEffect(() => {
    if(localTheme){
      document.querySelector('body')?.setAttribute('data-theme', localTheme)
      return
    }

    document.querySelector('body')?.setAttribute('data-theme', 'light')
  },[localTheme])
}

export default useLoadLocalTheme