import React from 'react'
import s from './CustomTooltip.module.scss'
import { UseClickOutside } from 'shared/hooks/UseClickOutside'
import { useTranslation } from 'react-i18next'

const CustomTooltip = (props: any) => {
  const { t } = useTranslation()
  const { editorState, removeBlock } = props

  const menuRef = React.useRef(null)
  UseClickOutside(menuRef, () => setOpen(false))

  const [visible, setVisible] = React.useState<boolean>()

  const [absolutetop, setAbsoluteTop] = React.useState<number>(0)

  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const contentState = editorState.getCurrentContent()
    const selection = editorState.getSelection()

    if (contentState && selection) {
      const block = contentState.getBlockForKey(selection.getFocusKey())
      if (block) {
        const doc: any = document.querySelectorAll(
          `[data-offset-key="${selection.getFocusKey()}-0-0"]`
        )
        setAbsoluteTop(doc[0].offsetTop)
        setVisible(true)
      }
    }
  }, [editorState])

  const deleteBlock = () => {
    removeBlock()
    setOpen(false)
    setVisible(false)
  }

  const isFirstBlock = () => {
    const selection = editorState.getSelection()
    const contentState = editorState.getCurrentContent()
    const firstBlock = contentState.getFirstBlock()
    const currentBlock = contentState.getBlockForKey(selection.getStartKey())
    if (firstBlock && currentBlock) {
      return firstBlock.getKey() === currentBlock.getKey()
    }
  }

  return (
    <>
      {isFirstBlock() === false && visible && (
        <div
          onClick={(e) => e.stopPropagation()}
          className={s.wrapper}
          style={{
            top: absolutetop,
          }}
        >
          <div onClick={() => setOpen((prev: any) => !prev)} className={s.icon}>
            <div className={s.buttons__icon}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
              >
                <g fill='#000'>
                  <path d='M4 9.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM12 9.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM22.5 12a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0Z' />
                </g>
              </svg>
            </div>
          </div>
          {open && (
            <div ref={menuRef} className={s.menu}>
              <div onMouseDown={deleteBlock} className={s.button}>
                {t('delete')}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default CustomTooltip
