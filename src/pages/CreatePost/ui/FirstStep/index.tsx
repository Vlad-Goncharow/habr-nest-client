import Draft, { Editor, EditorState, Modifier, RichUtils, convertFromRaw, convertToRaw, getDefaultKeyBinding } from 'draft-js'
import { Map } from 'immutable'
import React, { ChangeEvent } from 'react'
import CustomTitleBlock from '../CustomTitleBlock'
import CustomTooltip from '../CustomTooltip'
import EditorControls from '../EditorControls'
import InlineControls from '../InlineControls'
import { valuesType } from '../CreatePost'
import s from './FirstStep.module.scss'
import classNames from 'classnames'

export const styleMap = {
  CODE: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    padding: 2
  },
};

interface FirstStepProps{
  values: valuesType
  setValues:(values:any) => void
  setStep:(step:number) => void
}

export const blockRenderMap = Map({
  'custom-title-one': {
    wrapper: <CustomTitleBlock />,
  },
  'custom-title-two': {
    wrapper: <CustomTitleBlock />,
  },
  'custom-title-three': {
    wrapper: <CustomTitleBlock />,
  },
});

const FirstStep: React.FC<FirstStepProps> = ({setValues,setStep,values}) => {
  //editor ref
  const editorRef = React.useRef<any>(null)

  //editor state
  const [editorState, setEditorState] = React.useState(EditorState.createEmpty())

  //check values state from local storage
  const [isShowStorage, setIsShowStorage] = React.useState<boolean>(false)
  React.useEffect(() => {
    const valuesLocalStorage = localStorage.getItem('postData');
    if (valuesLocalStorage){
      const parsedData = JSON.parse(valuesLocalStorage)
      const parsedEditorState = JSON.parse(parsedData.content)

      if (parsedEditorState.blocks.length > 1 && parsedData.title.length > 1){
        setIsShowStorage(true)
      } else {
        setIsShowStorage(false)
      }
    }
  },[])

  //load values from local storage when click button
  const loadEditorStateFromLocalStorage = () => {
    const valuesLocalStorage = localStorage.getItem('postData');
    
    if (valuesLocalStorage) {
      const values = JSON.parse(valuesLocalStorage)
      const editorValues = convertFromRaw(JSON.parse(values.content))

      setValues(values)
      setEditorState(EditorState.createWithContent(editorValues))
    }
  }

  //change editor state
  const changeEditorState = (editorStateParam: any): void => {
    setEditorState(editorStateParam)
  }

  //toggle block type
  const toggleBlockType = (blockType: any) => {
    changeEditorState(
      RichUtils.toggleBlockType(
        editorState,
        blockType
      )
    )
    editorRef.current.focus()
  }

  //toggle block style | bold | italic...
  const toggleBlockStyle = (style: string) => {
    changeEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  //remove block
  const removeBlock = () => {
    const selection = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    const blockKey = selection.getStartKey();
    const block = contentState.getBlockForKey(blockKey);
    if (!block) {
      console.error('Block does not exist.');
      return;
    }
    const blockMap = contentState.getBlockMap().delete(blockKey);
    const newContentState = contentState.set('blockMap', blockMap);
    const newEditorState = EditorState.push(
      editorState,
      newContentState,
      'remove-block'
    );
    setEditorState(EditorState.forceSelection(newEditorState, newContentState.getSelectionAfter()));
  };

  //update text to save post
  React.useEffect(() => {
    const contentState = editorState.getCurrentContent();
    const contentStateJSON = convertToRaw(contentState);
    const textToSave = JSON.stringify(contentStateJSON);
    setValues((prev: valuesType) => {
      return {
        ...prev,
        content: textToSave
      }
    })
  },[editorState, setValues])

  //check if when user open first step editor state dont rewrite localStorage
  const isFirstBlock = () => {
    const selection = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    const firstBlock = contentState.getFirstBlock();
    const currentBlock = contentState.getBlockForKey(selection.getStartKey());
    if (firstBlock && currentBlock) {
      return firstBlock.getKey() === currentBlock.getKey();
    }
  };
  React.useEffect(() => {
    if (!isFirstBlock()){
      localStorage.setItem('postData', JSON.stringify(values));
      setIsShowStorage(false)
    }
  }, [values])

  //handleKeyCommand || keyBindingFn
  const handleKeyCommand = (command:any, editorState:any) => {
    if (command === 'enter') {
      const contentState = editorState.getCurrentContent();
      const selection = editorState.getSelection();
      const newContentState = Modifier.splitBlock(contentState, selection);
      const newEditorState = EditorState.push(editorState, newContentState, 'split-block');
      const newBlockType = 'unstiled'; // или другой тип заголовка
      const newContentStateWithHeader = Modifier.setBlockType(newContentState, newEditorState.getSelection(), newBlockType);
      const newEditorStateWithHeader = EditorState.push(newEditorState, newContentStateWithHeader, 'change-block-type');
      const currentBlock = contentState.getBlockForKey(selection.getStartKey());
      const blockType = currentBlock.getType();

      if (blockType === 'unordered-list-item' || blockType === 'ordered-list-item') {
        const newContentState = Modifier.splitBlock(contentState, selection);
        const newEditorState = EditorState.push(editorState, newContentState, 'split-block');
        setEditorState(newEditorState);
        return 'handled';
      }

      setEditorState(EditorState.forceSelection(newEditorStateWithHeader, newContentStateWithHeader.getSelectionAfter()));
      return 'handled';
    } else if (command === 'newline-block') {
      const contentState = editorState.getCurrentContent();
      const selection = editorState.getSelection();
      const newContentState = Modifier.insertText(contentState, selection, '\n');
      const newEditorState = EditorState.push(editorState, newContentState, 'insert-characters');

      setEditorState(newEditorState);
      return 'handled';
    }
    return 'not-handled';
  };
  const keyBindingFn = (e:any) => {
    if (e.keyCode === 13 && e.shiftKey) {  // Enter key
      return 'newline-block';
    } else if (e.keyCode === 13) { // Enter key
      return 'enter';
    }
    return getDefaultKeyBinding(e);
  };

  //change post title
  const changeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setValues((prev: valuesType) => {
      localStorage.setItem('postData', JSON.stringify({ ...values, title: e.target.value }));
      return {
        ...prev,
        title: e.target.value
      }
    })
  }

  //custom blocks map
  const blockRenderMapp = Map({
    'custom-title-one': {
      wrapper: <CustomTitleBlock
        editorState={editorState}
        removeBlock={removeBlock}
        toggleBlockType={toggleBlockType}
        editorRef={editorRef}
      />,
      editable: true,
    },
    'custom-title-two': {
      wrapper: <CustomTitleBlock
        editorState={editorState}
        removeBlock={removeBlock}
        toggleBlockType={toggleBlockType}
        editorRef={editorRef}
      />,
      editable: true,
    },
    'custom-title-three': {
      wrapper: <CustomTitleBlock
        editorState={editorState}
        removeBlock={removeBlock}
        toggleBlockType={toggleBlockType}
        editorRef={editorRef}
      />,
      editable: true,
    },
  });
  // extendet default block types
  const extendedBlockRenderMap = Draft.DefaultDraftBlockRenderMap.merge(blockRenderMapp);

  //nest button ref for active or disable
  const nextButtonRef = React.useRef<HTMLButtonElement>(null)

  //handle click
  const handleButtonClick = () => {
    if (nextButtonRef.current && nextButtonRef.current.classList.contains(s.next_active)) {
      setStep(2);
    }
  };

  //length editor state block for active or disable nest step
  const lengthBlocks = values.content ? JSON.parse(values.content) ? JSON.parse(values.content).blocks.length : 1 : 1
  
  return (
    <>
      
      <div className={s.wrapper}>
        {
          isShowStorage &&
          <div className={s.wrapper__top}>
            <div className={s.saved}>
              У вас есть резервное сохранение <span onClick={loadEditorStateFromLocalStorage}>Восстановить</span>
            </div>
          </div>
        }
        <div className={s.wrapper__bottom}>
          <form action="" className={s.form}>
            <input type="text" value={values.title} onChange={changeInputValue} placeholder='Введите название публикации' />
          </form>
          <div onClick={() => editorRef.current.focus()} className={`${s.content} ${s.text}`}>
            <div className="item__wrapper">
              <Editor
                editorState={editorState}
                onChange={setEditorState}
                ref={editorRef}
                handleKeyCommand={handleKeyCommand}
                keyBindingFn={keyBindingFn}
                blockRenderMap={extendedBlockRenderMap}
                customStyleMap={styleMap}
              />
            </div>
            <InlineControls editorState={editorState} toggleBlockStyle={toggleBlockStyle} />
            <CustomTooltip editorState={editorState} removeBlock={removeBlock} editorRef={editorRef} />
            <EditorControls editorState={editorState} toggleBlockType={toggleBlockType} editorRef={editorRef} />
          </div>
          <button
            ref={nextButtonRef}
            className={classNames(s.next,{
              [s.next_active]: (values.title.length > 5) && (lengthBlocks > 5),
              [s.next_disable]: (values.title.length < 5) && (lengthBlocks < 5),
            })} 
            onClick={handleButtonClick}
          >
            Далее к настройкам
          </button>
        </div>
      </div>
    </>
  )
}

export default FirstStep