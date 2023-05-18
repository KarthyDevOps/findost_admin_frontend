import ReactQuill from "react-quill";
import "quill/dist/quill.snow.css";
import "./style.scss";
import React,{ useState }  from "react";
// const [quill, setQuill] = useState("");
const Quill = ReactQuill.Quill;
var Block = Quill.import("blots/block");
Block.tagName = "div";
Quill.register(Block);
const modules = {
  toolbar: [
    [{ size: ["small", false, "large", "huge"] }],
    ["bold", "italic", "underline", "strike"],

    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    [
      { align: "" },
      { align: "center" },
      { align: "right" },
      { align: "justify" },
    ],
    [{ color: [] }, { background: [] }],
    ["link", "image"],
    ["clean"],
  ],
  clipboard: {
    matchVisual: false,
  },
};

const TextEditor = (props) => {
  const { content,setContent } = props;
  const handleChange = (state) => {
    setContent(state);
  };
  return (
    <div>
        <ReactQuill
        className="editorClassName"
        theme="snow"
        value={content}
        defaultValue={content}
        onChange={setContent}
        modules={modules}
        style={{ height: "400px", border: "none" ,marginBottom:'40px'}}
      />
    
    </div>
  );
};

export default TextEditor;
