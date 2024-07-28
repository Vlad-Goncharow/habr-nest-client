import React from 'react'
import s from './InlineControls.module.scss'
import InlineControlBtn from '../InlineControlBtn'
import { UseClickOutside } from 'shared/hooks/UseClickOutside'

const inlineStyles = [
  { label: 'Bold', style: 'BOLD' },
  { label: 'Italic', style: 'ITALIC' },
  { label: 'Underline', style: 'UNDERLINE' },
  { label: 'Monospace', style: 'CODE' },
]

interface InlineControlsProps {
  toggleBlockStyle: any
  editorState: any
}

const InlineControls: React.FC<InlineControlsProps> = ({
  toggleBlockStyle,
  editorState,
}) => {
  //controls menu ref
  const controlsRef = React.useRef(null)

  //show menu
  const [isShow, setIsShow] = React.useState(false)

  //absolute top value
  const [absoluteTop, setAbsoluteTop] = React.useState(0)

  //selection state
  const selectionState = editorState.getSelection()

  //calc absolute top value | show or now menu
  React.useEffect(() => {
    const anchorKey = selectionState.getAnchorKey()
    const currentContent = editorState.getCurrentContent()
    const currentContentBlock = currentContent.getBlockForKey(anchorKey)
    const start = selectionState.getStartOffset()
    const end = selectionState.getEndOffset()
    if (currentContentBlock) {
      const doc: any = document.querySelectorAll(
        `[data-offset-key="${anchorKey}-0-0"]`
      )
      setAbsoluteTop(Number(doc[0].offsetTop) - 35)

      const selectedText = currentContentBlock.getText().slice(start, end)
      if (selectedText.length > 0) {
        setIsShow(true)
      } else {
        setIsShow(false)
      }
    }
  }, [editorState, selectionState])

  //if click outside menu, hide menu
  UseClickOutside(controlsRef, () => setIsShow(false))

  return (
    <>
      {isShow && selectionState.hasFocus && (
        <div
          ref={controlsRef}
          className={s.inlines}
          style={{ top: absoluteTop }}
        >
          {inlineStyles.map((el) => (
            <InlineControlBtn
              key={el.label}
              style={el.style}
              onToggle={toggleBlockStyle}
            />
          ))}
        </div>
      )}
    </>
  )
}

export default InlineControls
