import { fetchModalActions, getFetchModalData } from 'entities/FetchModal'
import React from 'react'
import { useAppSelector } from 'shared/hooks/useAppSelector'
import s from './FetchModal.module.scss'
import classNames from 'classnames'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'

function FetchModal() {
  const { type, visible, content } = useAppSelector(getFetchModalData)
  const modalRef = React.useRef<HTMLDivElement>(null)

  const addActive = () => {
    if (modalRef.current !== null) {
      modalRef.current.classList.add(s.modal_active)
    }
  }

  const addDisable = () => {
    if (modalRef.current !== null) {
      modalRef.current.classList.remove(s.modal_active)
    }
  }

  React.useEffect(() => {
    let timer: NodeJS.Timeout
    if (visible) {
      timer = setTimeout(addActive, 100)
    } else {
      timer = setTimeout(addDisable, 1000)
    }

    return () => {
      clearTimeout(timer)
    }
  }, [type, content, visible])

  const dispatch = useAppDispatch()
  React.useEffect(() => {
    let timer: NodeJS.Timeout
    if (visible) {
      timer = setTimeout(() => {
        dispatch(fetchModalActions.hideModal())
      }, 3000)
    }

    return () => {
      clearTimeout(timer)
    }
  }, [visible])

  return (
    <div
      ref={modalRef}
      className={classNames(s.modal, {
        [s.modal_good]: type === 'good',
        [s.modal_bad]: type === 'bad',
      })}
    >
      {content}
    </div>
  )
}

export default FetchModal
