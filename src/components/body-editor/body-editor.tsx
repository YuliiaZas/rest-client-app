import Editor from '@monaco-editor/react';
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
    if (readOnly) {
      const formatted = JSON.stringify(JSON.parse(body || '{}'), null, 2);
      setFormattedJson(formatted);
    }
  }, [body, readOnly]);

  return (
    <>
      {!readOnly && (
        <div className={styles.editor__selector}>
          <Dropdown
            items={languageOptions}
            selectedItem={language}
            selectOption={(value) => setLanguage(value as Language)}
            buttonTransparent={true}
          />
        </div>
      )}
      <Editor
        height="30vh"
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
