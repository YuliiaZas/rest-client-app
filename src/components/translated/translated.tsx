import { useTranslations } from 'next-intl';

type TranslatedProps = {
  scope?: string;
  text?: string;
};

export function Translated({ scope, text }: TranslatedProps) {
  const t = useTranslations(scope);

  if (!text || !scope) return null;

  return t(text);
}
