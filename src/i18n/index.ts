import { createI18n } from 'vue-i18n';

// Lazy load locale files
const loadLocaleMessages = () => {
  const locales = import.meta.glob('../locales/*.json', { eager: true });
  const messages: Record<string, any> = {};

  for (const [path, module] of Object.entries(locales)) {
    const locale = path.match(/locales\/(.+)\.json$/)?.[1];
    if (locale) {
      messages[locale] = (module as any).default;
    }
  }

  return messages;
};

// Get browser language or default to 'en'
const getBrowserLocale = (): string => {
  // Check if we're in a browser environment
  if (typeof navigator === 'undefined') {
    return 'en';
  }
  const browserLang = navigator.language.split('-')[0];
  const supportedLocales = ['en', 'ru', 'cn', 'es', 'fr', 'gr', 'tr', 'id', 'jp', 'kr'];
  return supportedLocales.includes(browserLang) ? browserLang : 'en';
};

// Get initial locale (safe for SSR)
const getInitialLocale = (): string => {
  // During SSR, default to 'en'
  if (typeof window === 'undefined') {
    return 'en';
  }
  // On client, check localStorage first, then browser locale
  return localStorage.getItem('user-locale') || getBrowserLocale();
};

// Create i18n instance with custom message resolver for empty string fallback
const messages = loadLocaleMessages();

// Wrap all non-English messages to fallback to English on empty strings
Object.keys(messages).forEach(locale => {
  if (locale !== 'en') {
    const localeMessages = messages[locale];
    const wrappedMessages: Record<string, any> = {};
    
    Object.keys(localeMessages).forEach(key => {
      if (key === '_metadata') {
        wrappedMessages[key] = localeMessages[key];
      } else if (typeof localeMessages[key] === 'string' && localeMessages[key] === '') {
        // Don't include empty strings - let vue-i18n fall back to English
        // by not setting the key at all
      } else {
        wrappedMessages[key] = localeMessages[key];
      }
    });
    
    messages[locale] = wrappedMessages;
  }
});

const i18n = createI18n({
  legacy: false, // Use Composition API mode
  locale: getInitialLocale(),
  fallbackLocale: 'en',
  messages: messages,
  globalInjection: true, // Enable $t in templates
  missingWarn: false, // Disable warnings for missing translations in dev
  fallbackWarn: false
});

export default i18n;
