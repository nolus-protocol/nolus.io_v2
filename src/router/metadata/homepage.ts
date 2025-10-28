import type { I18n } from 'vue-i18n';

export const getMeta = (i18n: I18n) => {
  const locale = typeof i18n.global.locale === 'string' ? i18n.global.locale : i18n.global.locale.value;
  const t = (key: string) => (i18n.global as any).t(key) as string;
  
  const baseUrl = 'https://nolus.io';
  const localePrefix = locale !== 'en' ? `/${locale}` : '';
  
  return {
    title: t('meta_home_title'),
    description: t('meta_home_description'),
    keywords: t('meta_home_keywords'),
    canonical: `${baseUrl}${localePrefix}/`,

    "og:type": "website",
    "og:url": `${baseUrl}${localePrefix}/`,
    "og:title": t('meta_home_ogTitle'),
    "og:description": t('meta_home_ogDescription'),
    "og:image": `${baseUrl}/assets/images/meta/home-meta.png`,

    "twitter:card": "summary_large_image",
    "twitter:url": `${baseUrl}${localePrefix}/`,
    "twitter:title": t('meta_home_twitterTitle'),
    "twitter:description": t('meta_home_twitterDescription'),
    "twitter:image": `${baseUrl}/assets/images/meta/home-meta.png`,

    "script-organisation": {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Nolus Protocol",
      alternateName: "Nolus",
      url: "https://nolus.io/",
      logo: "https://nolus.io/assets/images/meta/nolus-logo.svg",
      sameAs: [
        "https://github.com/nolus-protocol",
        "https://nolus.io/",
        "https://www.youtube.com/@NolusProtocol",
        "https://twitter.com/NolusProtocol",
        "https://www.reddit.com/r/nolusprotocol/"
      ]
    }
  };
};
