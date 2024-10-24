import nb from '../locales/nb.json';
import en from '../locales/en.json';
import de from '../locales/de.json';
import it from '../locales/it.json';
import fr from '../locales/fr.json';
import nl from '../locales/nl.json';
import pl from '../locales/pl.json';
import ro from '../locales/ro.json';
import ru from '../locales/ru.json';
import pt from '../locales/pt.json';

const translations = {
  nb,
  en,
  de,
  it,
  fr,
  nl,
  pl,
  ro,
  ru,
  pt,
};

export function getTranslation(key, locale) {
  return translations[locale] && translations[locale][key] || translations.en[key] || key;
}
