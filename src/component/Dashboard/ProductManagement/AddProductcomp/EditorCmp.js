import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const TextEditor = () => {
  const [editorState, setEditorState] = useState(null);

  const handleChange = (state) => {
    setEditorState(state);
  };

  return (
    <div>
      <Editor editorState={editorState} onEditorStateChange={handleChange} />
    </div>
  );
};

export default TextEditor;
