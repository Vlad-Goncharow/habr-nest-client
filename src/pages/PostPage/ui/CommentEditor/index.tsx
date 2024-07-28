import React from 'react'
import s from './CommentEditor.module.scss'
import { EditorState } from 'draft-js'
import { Editor } from 'draft-js'
import axios from '../../../../axios'
import { useParams } from 'react-router-dom'
import { IComment } from 'shared/types/comments'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { fetchModalActions } from 'entities/FetchModal'
import { convertToRaw } from 'draft-js'

interface CommentEditorProps {
  setComments: React.Dispatch<React.SetStateAction<IComment[]>>
}

const CommentEditor: React.FC<CommentEditorProps> = ({ setComments }) => {
  //dispatch
  const dispatch = useAppDispatch()

  //params
  const { postId } = useParams()

  //editor ref
  const editorRef = React.useRef<any>(null)

  //editor state
  const [editorState, setEditorState] = React.useState(
    EditorState.createEmpty()
  )

  //comment value
  const [value, setValue] = React.useState<any>()

  //submit btn
  const submitComment = React.useRef<HTMLButtonElement>(null)

  //submit fn
  const clickSubmit = async () => {
    try {
      const { data } = await axios.post(`/comments/create/${postId}`, {
        content: value,
      })

      if (data) {
        setComments((prev: IComment[]) => [...prev, data])
        setEditorState(EditorState.createEmpty())
      }
    } catch (e) {
      dispatch(
        fetchModalActions.showModal({
          type: 'bad',
          content: 'При отправке комментария произошла ошибка!',
        })
      )
    }
  }

  //nest button ref for active or disable
  const handleButtonClick = () => {
    if (
      submitComment.current &&
      submitComment.current.classList.contains(s.buttons__btn_active)
    ) {
      clickSubmit()
    }
  }

  //update value | check length
  React.useEffect(() => {
    const contentState = editorState.getCurrentContent()
    const contentStateJSON = convertToRaw(contentState)
    const textToSave = JSON.stringify(contentStateJSON)
    setValue(textToSave)

    const textLength = contentState.getPlainText().length

    if (submitComment.current) {
      if (textLength >= 10) {
        submitComment.current.classList.remove(s.buttons__btn_disable)
        submitComment.current.classList.add(s.buttons__btn_active)
      } else {
        submitComment.current.classList.remove(s.buttons__btn_active)
        submitComment.current.classList.add(s.buttons__btn_disable)
      }
    }
  }, [editorState])

  return (
    <div className={s.form}>
      <h3 className={s.form__title}>Ваш Коментарий</h3>
      <div onClick={() => editorRef.current.focus()} className={s.editor}>
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          ref={editorRef}
        />
      </div>
      <div className={s.form__bottom}>
        <div onClick={handleButtonClick} className={s.buttons}>
          <button ref={submitComment} type='button' className={s.buttons__btn}>
            Отправить
          </button>
        </div>
      </div>
    </div>
  )
}

export default CommentEditor
