import { useTranslations } from 'next-intl';

type TranslatedProps = {
  scope?: string;
  text?: string;
  showRawTextByDefault?: boolean;
};

export function Translated({
  scope,
  text,
  showRawTextByDefault = false,
}: TranslatedProps): string | null {
  const t = useTranslations(scope);

  const inValidTranslatedText = (showRawTextByDefault && text) || null;
  if (!text || !scope || !t.has(text)) return inValidTranslatedText;

  return t(text);
}
