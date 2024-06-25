import { createIntl, createIntlCache } from 'react-intl';

interface Translations {
  [key: string]: { [key: string]: string };
}

import translations from '../../i18n.json';

const translationsTyped = translations as Translations;

const cache = createIntlCache();

export const intl = createIntl(
  {
    locale: 'pt-BR',
    messages: translationsTyped['pt-BR']
  },
  cache
);
