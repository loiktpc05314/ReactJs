import  { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const MyEditor = () => {
  const [editorData, setEditorData] = useState('');

  return (
    <div>
      <h2>CKEditor 5 in React</h2>
      <CKEditor
        editor={ClassicEditor}
        data={editorData}
        onChange={(event, editor) => {
          const data = editor.getData();
          setEditorData(data);
          console.log({ event, editor, data });
        }}
      />
    </div>
  );
};

export default MyEditor;
