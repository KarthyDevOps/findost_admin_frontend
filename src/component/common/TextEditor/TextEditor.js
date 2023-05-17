import React from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./style.scss";

const TextEditor = (props) => {
  const { content,setContent } = props;
  const handleChange = (state) => {
    setContent(state);
  };
  return (
    <div>
      <Editor
        editorState={content}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={handleChange}
      />
    </div>
  );
};

export default TextEditor;
