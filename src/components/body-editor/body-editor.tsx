import { useNotificationsContext, useClientContext } from '@/context';
import {
  BodyLanguage,
  bodyLanguages,
  contentTypeHeaderJson,
  contentTypeHeaderText,
  defaultHeaders,
} from '@/data';
import { DropdownItem } from '@/entites';
import { updateUrl } from '@/utils';
import Editor, { Monaco } from '@monaco-editor/react';
import { useEffect, useState } from 'react';
import { Dropdown } from '../dropdown';
import { ScrollLayout } from '../scroll-layout';

type RequestOptions = {
  body: string;
  readOnly?: boolean;
};

export default function BodyEditor({ readOnly, body }: RequestOptions) {
  const { url, method, headerParams, setBody, setAppDefaultHeaders } =
    useClientContext();
  const [formattedJson, setFormattedJson] = useState(body);
  const [language, setLanguage] = useState<BodyLanguage>(bodyLanguages[0]);
  const languageOptions: DropdownItem[] = [
    { value: bodyLanguages[0], label: 'JSON' },
    { value: bodyLanguages[1], label: 'String' },
  ];
  const { addNotification } = useNotificationsContext();

  useEffect(() => {
    try {
      if (readOnly) {
        const formatted = JSON.stringify(JSON.parse(body || '{}'), null, 2);
        setFormattedJson(formatted);
      }
    } catch {
      addNotification({ message: 'parseBody' });
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

  const handleChangeBody = (newBody: string) => {
    updateUrl(method, url, newBody, headerParams);
    setBody(newBody);
  };

  const changeLanguage = (value: BodyLanguage) => {
    setLanguage(value);
    setAppDefaultHeaders([
      ...defaultHeaders,
      value === bodyLanguages[0]
        ? contentTypeHeaderJson
        : contentTypeHeaderText,
    ]);
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
            selectOption={(value) => changeLanguage(value as BodyLanguage)}
          />
        )
      }
    >
      <Editor
        theme="customTheme"
        beforeMount={handleEditorMount}
        defaultLanguage={language}
        value={formattedJson}
        onChange={(value) => handleChangeBody(value as string)}
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
