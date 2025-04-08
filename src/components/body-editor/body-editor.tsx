import Editor, { Monaco } from '@monaco-editor/react';
import { useContext, useEffect, useState } from 'react';
import { BodyLanguage, bodyLanguages } from '@/data';
import { DropdownItem } from '@/entites';
import { Dropdown } from '../dropdown';
import { ScrollLayout } from '../scroll-layout';
import { NotificationsContext } from '@/context';

type RequestOptions = {
  body: string;
  setBody: (body: string) => void;
  readOnly?: boolean;
  onLanguageChange?: (language: BodyLanguage) => void;
};

export default function BodyEditor({
  body,
  setBody,
  readOnly,
  onLanguageChange,
}: RequestOptions) {
  const [formattedJson, setFormattedJson] = useState(body);
  const [language, setLanguage] = useState<BodyLanguage>(bodyLanguages[0]);
  const languageOptions: DropdownItem[] = [
    { value: bodyLanguages[0], label: 'JSON' },
    { value: bodyLanguages[1], label: 'String' },
  ];
  const { addNotification } = useContext(NotificationsContext);

  useEffect(() => {
    if (onLanguageChange) onLanguageChange(language);
  }, [language]);

  useEffect(() => {
    try {
      if (readOnly) {
        const formatted = JSON.stringify(JSON.parse(body || '{}'), null, 2);
        setFormattedJson(formatted);
      }
    } catch {
      addNotification({ message: 'JSON parsing in the body editor' });
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
            selectOption={(value) => setLanguage(value as BodyLanguage)}
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
