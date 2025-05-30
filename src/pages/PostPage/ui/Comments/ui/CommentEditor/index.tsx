import React from 'react'
import s from './CommentEditor.module.scss'
import { EditorState } from 'draft-js'
import { Editor } from 'draft-js'
import axios from '../../../../../../axios'
import { useParams } from 'react-router-dom'
import { IComment } from 'shared/types/comments'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { fetchModalActions } from 'entities/FetchModal'
import { convertToRaw } from 'draft-js'
import { useTranslation } from 'react-i18next'
import IsActiveEmail from 'shared/ui/isActiveEmail'
import { useAppSelector } from 'shared/hooks/useAppSelector'
import { checkIsActiveEmail } from 'entities/User'

interface CommentEditorProps {
  setComments: React.Dispatch<React.SetStateAction<IComment[]>>
}

const CommentEditor: React.FC<CommentEditorProps> = ({ setComments }) => {
  const isActiveEmail = useAppSelector(checkIsActiveEmail)
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const { postId } = useParams()

  const editorRef = React.useRef<any>(null)

  const [editorState, setEditorState] = React.useState(
    EditorState.createEmpty()
  )

  const [value, setValue] = React.useState<any>()

  const submitComment = React.useRef<HTMLButtonElement>(null)

  const clickSubmit = async () => {
    try {
      if (isActiveEmail) {
        const { data } = await axios.post(`/comments/create/${postId}`, {
          content: value,
        })

        if (data) {
          setComments((prev: IComment[]) => [...prev, data])
          setEditorState(EditorState.createEmpty())
        }
      }
    } catch (e) {
      dispatch(
        fetchModalActions.showModal({
          type: 'bad',
          content: t('commentSendError'),
        })
      )
    }
  }

  const handleButtonClick = () => {
    if (
      submitComment.current &&
      submitComment.current.classList.contains(s.buttons__btn_active)
    ) {
      clickSubmit()
    }
  }

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
    <IsActiveEmail>
      <div className={s.form}>
        <h3 className={s.form__title}>{t('commentsTitle')}</h3>
        <div onClick={() => editorRef.current.focus()} className={s.editor}>
          <Editor
            editorState={editorState}
            onChange={setEditorState}
            ref={editorRef}
            tabIndex={isActiveEmail ? 0 : -1}
          />
        </div>
        <div className={s.form__bottom}>
          <div onClick={handleButtonClick} className={s.buttons}>
            <button
              ref={submitComment}
              type='button'
              className={s.buttons__btn}
            >
              {t('commentsSend')}
            </button>
          </div>
        </div>
      </div>
    </IsActiveEmail>
  )
}

export default CommentEditor
