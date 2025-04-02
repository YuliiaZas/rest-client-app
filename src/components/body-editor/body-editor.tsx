import Editor, { Monaco } from '@monaco-editor/react';
import { useEffect, useState } from 'react';
import styles from './body-editor.module.scss';
import { DropdownItem } from '@/entites';
import { Dropdown } from '../dropdown';

type RequestOptions = {
  body: string;
  setBody: (body: string) => void;
  readOnly?: boolean;
};

type Language = 'json' | 'plaintext';

export default function BodyEditor({
  body,
  setBody,
  readOnly,
}: RequestOptions) {
  const [formattedJson, setFormattedJson] = useState(body);
  const [language, setLanguage] = useState<Language>('json');
  const languageOptions: DropdownItem[] = [
    { value: 'json', label: 'JSON' },
    { value: 'plaintext', label: 'String' },
  ];

  useEffect(() => {
    try {
      if (readOnly) {
        const formatted = JSON.stringify(JSON.parse(body || '{}'), null, 2);
        setFormattedJson(formatted);
      }
    } catch (err) {
      console.error(err);
    }
  }, [body, readOnly]);

  const handleEditorMount = (monaco: Monaco) => {
    monaco.editor.defineTheme('customTheme', {
      base: 'vs',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#fafafa',
      },
    });
  };

  return (
    <>
      {!readOnly && (
        <div className={styles.editor__selector}>
          <Dropdown
            items={languageOptions}
            selectedItem={language}
            showButtonBorder={false}
            colors="content"
            selectOption={(value) => setLanguage(value as Language)}
          />
        </div>
      )}
      <Editor
        height="25vh"
        theme="customTheme"
        beforeMount={handleEditorMount}
        defaultLanguage={language}
        value={formattedJson}
        onChange={(value) => setBody(value as string)}
        key={language}
        options={{
          readOnly,
          selectOnLineNumbers: true,
          automaticLayout: true,
        }}
      />
    </>
  );
}
