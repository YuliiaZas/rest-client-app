import { Method } from '@/data';
import {
  SupportedLanguages,
  supportedLanguagesOptions,
} from '@/data/supported-languages';
import { generateCodeSnippet } from '@/utils/code-generator';
import { useState } from 'react';
import { CopyBlock, dracula } from 'react-code-blocks';
import styles from './code-generator.module.scss';

type CodeGeneratorProps = {
  method: Method;
  url: string;
};

export default function CodeGenerator({ method, url }: CodeGeneratorProps) {
  const [language, setLanguage] = useState<SupportedLanguages>('curl');
  const [code, setCode] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const generateSnippet = async () => {
    try {
      setLoading(true);

      const snippet = await generateCodeSnippet({
        method,
        url,
        headers: { 'Content-Type': 'application/json' },
        body: { key: 'value' },
        language,
      });

      setCode(snippet || 'Error generating code');
    } catch (err) {
      setCode((err as Error).toString());
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className={styles.controls}>
        <select
          onChange={(e) => setLanguage(e.target.value as SupportedLanguages)}
          value={language}
          className="select"
        >
          {supportedLanguagesOptions.map((lang) => (
            <option key={lang} value={lang}>
              {lang.toUpperCase()}
            </option>
          ))}
        </select>
        <button onClick={generateSnippet} className="btn" disabled={loading}>
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
