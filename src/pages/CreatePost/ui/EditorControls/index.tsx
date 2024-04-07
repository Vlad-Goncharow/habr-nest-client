import React from 'react'

import { UseClickOutside } from 'shared/hooks/UseClickOutside'
import CodeIcon from '../../../../shared/images/svg/code.svg'
import TitleIcon from '../../../../shared/images/svg/format-heading.svg'
import OlIcon from '../../../../shared/images/svg/list-ol.svg'
import UlIcon from '../../../../shared/images/svg/list-ul.svg'
import s from './EditorControls.module.scss'
import { ReactComponent as PlusSvg } from 'shared/images/svg/plusEditor.svg'

const BLOCK_TYPES = [
  { label: 'Загаловок 1', style: 'custom-title-one', icon: TitleIcon },
  { label: 'Загаловок 2', style: 'custom-title-two', icon: TitleIcon },
  { label: 'Загаловок 3', style: 'custom-title-three', icon: TitleIcon },
  { label: 'Список', style: 'unordered-list-item', icon: UlIcon },
  { label: 'Нумерованый список', style: 'ordered-list-item', icon: OlIcon },
  { label: 'Код', style: 'code-block', icon: CodeIcon },
];

type EditorControlsProps = {
  toggleBlockType: any
  editorRef: any
  editorState: any
}

const EditorControls: React.FC<EditorControlsProps> = React.memo(({ toggleBlockType, editorRef, editorState }) => {
  //visible controlls or not
  const [visible, setVisible] = React.useState<boolean>()

  //absolute top value
  const [absolutetop, setAbsoluteTop] = React.useState<number>(0)

  //open controlls menu or not
  const [open, setOpen] = React.useState(false)

  //controlls ref
  const controllsMenuRef = React.useRef<any>()
  UseClickOutside(controllsMenuRef, () => setOpen(false))

  //togle block type
  const customClick = (type: string) => {
    toggleBlockType(type)
    editorRef.current.focus()
    setVisible(false)
    setOpen(false)
  }

  //check if text is typed in block, check if block type is LISTS and there is no text, do not show menu
  React.useEffect(() => {
    const contentState = editorState.getCurrentContent();
    const selection = editorState.getSelection();

    if (contentState && selection) {
      const block = contentState.getBlockForKey(selection.getFocusKey());

      if (block) {
        const type = block.getType();
        const doc: any = document.querySelectorAll(`[data-offset-key="${selection.getFocusKey()}-0-0"]`)
        setAbsoluteTop(doc[0].offsetTop + (doc[0].clientHeight / 2) - 13);

        let spann = document.querySelector(`span[data-offset-key="${selection.getFocusKey()}-0-0"]`)
        if (spann?.textContent?.length !== undefined && spann?.textContent?.length > 0) {
          setVisible(false)
          setOpen(false)
        } else {
          setVisible(true)
        }

        if (type === 'unordered-list-item' || type === 'ordered-list-item') {
          setVisible(false)
          setOpen(false)
        }
      }
    }
  }, [editorState])

  return (
    <>
      {
        visible &&
        <div className={s.buttons} style={{
          top: absolutetop
        }} >
          {
            open
              ?
              <div ref={controllsMenuRef} className={s.buttons__row}>
                {BLOCK_TYPES.map((type: any) =>
                  <div
                    className={s.item}
                    key={type.label}
                    onMouseDown={() => customClick(type.style)}
                  >
                    <img src={type.icon} alt="" />
                    <span>
                      {type.label}
                    </span>
                  </div>
                )}
              </div>
              :
              <div onClick={() => setOpen(prev => !prev)} onMouseDown={() => editorRef.current.blur()} className={s.buttons__icon}>
                <PlusSvg />
              </div>
          }
        </div>
      }
    </>
  )
})

export default EditorControls