import React from 'react'

export const modules = {
    toolbar: {
      container: "#toolbar",  //name for editor is given by css selector
    },
  };

export const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "align",
    "script",
    "blockquote",
    "background",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
    "code-block"
  ];



const QuillToolbar = () => {
  return (
    <div id='toolbar'>
        <span className='ql-formats'>
          <button className='ql-header' value="1"/>
          <button className='ql-header' value="2"/>
        </span>
        <span className="ql-formats">
            <button className="ql-bold" />
            <button className="ql-italic" />
            <button className="ql-underline" />
        </span>
        <span className="ql-formats">
            <button className="ql-list" value="ordered" />
            <button className="ql-list" value="bullet" />
            <button className="ql-indent" value="-1" />
            <button className="ql-indent" value="+1" />
        </span>
        <span className="ql-formats">
            <button className="ql-blockquote" />
        </span>
        <span className="ql-formats">
            <select className="ql-align" />
            <select className="ql-color" />
            <select className="ql-background" />
        </span>
        <span className="ql-formats">
            <button className="ql-link" />
            <button className="ql-image" />
        </span>
        <span className="ql-formats">
            <button className="ql-code-block" />
            {/* <button className="ql-clean" /> */}
        </span>
    </div>
  )
}

export default QuillToolbar