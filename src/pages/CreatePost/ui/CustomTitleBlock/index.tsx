import classNames from 'classnames'
import React from 'react'
import s from './CustomTitleBlock.module.scss'

const CustomTitleBlock = (props: any) => {
  const { editorState } = props

  const [heading, setHeading] = React.useState<boolean>(() => {
    if (editorState) {
      const contentState = editorState.getCurrentContent()
      const selection = editorState.getSelection()
      const currentBlock = contentState.getBlockForKey(selection.getStartKey())
      return currentBlock.getLength() === 0
    }
    return false
  })

  React.useEffect(() => {
    if (editorState) {
      const contentState = editorState.getCurrentContent()
      const blockKey = props.children[0].props.children.props.block.key
      const currentBlock = contentState.getBlockForKey(blockKey)
      setHeading(currentBlock.getLength() === 0)
    }
  }, [editorState, props.children])

  return (
    <div
      className={classNames(s.item, {
        [s.item__heading]: heading === true,
        [s['heading-1']]:
          props.children[0].props.children.props.block.type ===
          'custom-title-one',
        [s['heading-2']]:
          props.children[0].props.children.props.block.type ===
          'custom-title-two',
        [s['heading-3']]:
          props.children[0].props.children.props.block.type ===
          'custom-title-three',
      })}
      data-empty-heading='Заголовок'
      data-offset-key={props['data-offset-key']}
    >
      {props.children}
    </div>
  )
}

export default CustomTitleBlock
