import React from 'react'

const useElementWidth = (className: string): number | null => {
  const [elementWidth, setElementWidth] = React.useState<number | null>(null)

  React.useEffect(() => {
    const element = document.querySelector(`.${className}`)

    const handleResize = () => {
      if (element instanceof HTMLElement) {
        const width = element.offsetWidth
        setElementWidth(width)
      }
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [className])

  return elementWidth
}

export default useElementWidth
