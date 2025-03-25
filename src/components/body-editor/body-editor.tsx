import Editor from '@monaco-editor/react';
import { useEffect, useState } from 'react';

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

  useEffect(() => {
    if (readOnly) {
      const formatted = JSON.stringify(JSON.parse(body || '{}'), null, 2);
      setFormattedJson(formatted);
    }
  }, [body, readOnly]);

  return (
    <Editor
      height="30vh"
      defaultLanguage="javascript"
      value={formattedJson}
      onChange={(value) => setBody(value as string)}
      options={{
        readOnly,
        selectOnLineNumbers: true,
        automaticLayout: true,
      }}
    />
  );
}
