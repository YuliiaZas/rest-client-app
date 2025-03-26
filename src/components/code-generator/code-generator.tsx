import { Method } from '@/data';
import { ISupportedLanguages } from '@/types/code-generator';
import { useState } from 'react';
import { CopyBlock, dracula } from 'react-code-blocks';
import styles from './code-generator.module.scss';

const SUPPORTED_LANGUAGES: ISupportedLanguages[] = [
  'curl',
  'fetch',
  'xhr',
  'nodejs',
  'python',
  'java',
  'csharp',
  'go',
];

type CodeGeneratorProps = {
  method: Method;
  url: string;
};

export default function CodeGenerator({ method, url }: CodeGeneratorProps) {
  const [language, setLanguage] = useState<ISupportedLanguages>('curl');
  const [code, setCode] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const generateSnippet = async () => {
    try {
      setLoading(true);

      const response = await fetch('/api/generate-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          method,
          url,
          headers: { 'Content-Type': 'application/json' },
          body: { key: 'value' },
          language,
        }),
      });

      const data = await response.json();
      setCode(data.snippet || 'Error generating code');
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className={styles.controls}>
        <select
          onChange={(e) => setLanguage(e.target.value as ISupportedLanguages)}
          value={language}
          className="select"
        >
          {SUPPORTED_LANGUAGES.map((lang) => (
            <option key={lang} value={lang}>
              {lang.toUpperCase()}
            </option>
          ))}
        </select>
        <button onClick={generateSnippet} className="btn">
          {loading ? 'Generating...' : 'Generate'}
        </button>
      </div>

      {code && (
        <div className={styles.codeWrapper}>
          <CopyBlock text={code} language={language} theme={dracula} />
        </div>
      )}
    </div>
  );
}
