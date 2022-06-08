import React, { useState } from "react";
import { Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
import "../../node_modules/draft-js/dist/Draft.css";

function MyEditor(props) {
  const { handleClick } = props;

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  return (
    <>
      <div className="text-editor">
        <Editor
          editorState={editorState}
          onChange={(editorState) => setEditorState(editorState)}
        />
      </div>
      <button onClick={() => handleClick(editorState)}>
        Publicar capítulo
      </button>
    </>
  );
}

export default MyEditor;
