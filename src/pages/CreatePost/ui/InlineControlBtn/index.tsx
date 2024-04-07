import React from 'react'
import s from './InlineControlBtn.module.scss'
import { ReactComponent as BoldEditor } from 'shared/images/svg/boldEditor.svg'
import { ReactComponent as ItalicEditor } from 'shared/images/svg/italicEditor.svg'
import { ReactComponent as UnderlineEditor } from 'shared/images/svg/underlineEditor.svg'
import { ReactComponent as CodeEditor } from 'shared/images/svg/codeEditor.svg'


interface InlineControlBtnProps{
  style:string
  onToggle:any
}

const InlineControlBtn: React.FC<InlineControlBtnProps> = ({ style, onToggle }) => {
  const checkIcon = (style:string) => {
    switch (style) {
      case 'BOLD':
        return (
          <BoldEditor/>
        )
      case 'ITALIC':
        return (
          <ItalicEditor />
        )
      case 'UNDERLINE' :
        return (
          <UnderlineEditor />
        )
      case 'CODE':
        return (
          <CodeEditor />
        )
    }
  }

  const changeStyle = (e:any) => {
    e.preventDefault()
    onToggle(style)
  }

  return (
    <div className={s.item} onMouseDown={changeStyle}>
      {checkIcon(style)}
    </div>
  )
}

export default InlineControlBtn