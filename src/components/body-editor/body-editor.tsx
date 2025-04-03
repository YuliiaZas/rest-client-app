import Editor, { Monaco } from '@monaco-editor/react';
import { useEffect, useState } from 'react';
import { DropdownItem } from '@/entites';
import { Dropdown } from '../dropdown';
import { ScrollLayout } from '../scroll-layout';

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
    <ScrollLayout
      headerChildren={
        !readOnly && (
          <Dropdown
            items={languageOptions}
            selectedItem={language}
            showButtonBorder={false}
            colors="content"
            selectOption={(value) => setLanguage(value as Language)}
          />
        )
      }
    >
      <Editor
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
    </ScrollLayout>
  );
}
