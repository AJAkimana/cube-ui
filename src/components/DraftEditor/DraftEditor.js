import React from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useStyles } from "./styles";

export const DraftEditor = ({ setEditorState, editorState }) => {
  const classes = useStyles();

  return (
    <Editor
      editorClassName={classes.editor}
      editorState={editorState}
      onEditorStateChange={setEditorState}
      toolbar={{
        options: [
          "inline",
          "blockType",
          "fontSize",
          "fontFamily",
          "list",
          "textAlign",
          "history",
        ],
        inline: { inDropdown: true },
        list: { inDropdown: true },
        textAlign: { inDropdown: true },
      }}
      toolbarClassName={classes.toolbar}
      wrapperClassName={classes.root}
    />
  );
};
