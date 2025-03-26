import Editor from '@monaco-editor/react';
import { useEffect, useState } from 'react';
import styles from './body-editor.module.scss';

type RequestOptions = {
  body: string;
  setBody: (body: string) => void;
  readOnly?: boolean;
};

export default function BodyEditor({
  body,
  setBody,
  readOnly,
}: RequestOptions) {
  const [formattedJson, setFormattedJson] = useState(body);
  const [language, setLanguage] = useState('json');

  useEffect(() => {
    if (readOnly) {
      const formatted = JSON.stringify(JSON.parse(body || '{}'), null, 2);
      setFormattedJson(formatted);
    }
  }, [body, readOnly]);

  return (
    <>
      {!readOnly && (
        <select
          onChange={(e) => setLanguage(e.target.value)}
          value={language}
          className={styles.selector}
        >
          <option value="json">JSON</option>
          <option value="plaintext">String</option>
        </select>
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
