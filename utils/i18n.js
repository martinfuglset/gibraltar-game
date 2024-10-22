import nb from '../locales/nb.json';
import en from '../locales/en.json';

const translations = {
  nb,
  en
};

export function getTranslation(key, locale) {
  return translations[locale] && translations[locale][key] || translations.en[key] || key;
}
