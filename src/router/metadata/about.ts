import type { I18n } from 'vue-i18n';

export const getMeta = (i18n: I18n) => {
  const locale = typeof i18n.global.locale === 'string' ? i18n.global.locale : i18n.global.locale.value;
  const t = (key: string) => (i18n.global as any).t(key) as string;
  
  const baseUrl = 'https://nolus.io';
  const localePrefix = locale !== 'en' ? `/${locale}` : '';
  
  return {
    title: t('meta_about_title'),
    description: t('meta_about_description'),
    keywords: t('meta_about_keywords'),
    canonical: `${baseUrl}${localePrefix}/about`,

    "og:type": "website",
    "og:url": `${baseUrl}${localePrefix}/about`,
    "og:title": t('meta_about_ogTitle'),
    "og:description": t('meta_about_ogDescription'),
    "og:image": `${baseUrl}/assets/images/meta/about-meta.png`,

    "twitter:card": "summary_large_image",
    "twitter:url": `${baseUrl}${localePrefix}/about`,
    "twitter:title": t('meta_about_twitterTitle'),
    "twitter:description": t('meta_about_twitterDescription'),
    "twitter:image": `${baseUrl}/assets/images/meta/about-meta.png`,

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
    },
    "script-video-object": {
      "@context": "http://schema.org/",
      "@type": "VideoObject",
      name: t('meta_about_videoName'),
      uploadDate: "2022-10-24",
      duration: "PT0H1M47S",
      contentUrl: "https://www.youtube.com/watch?v=k7QWPR0052g",
      embedUrl: "https://www.youtube.com/embed/k7QWPR0052g",
      thumbnailUrl:
        "https://i9.ytimg.com/vi/k7QWPR0052g/mqdefault.jpg?v=635641f9&sqp=CPC145oG&rs=AOn4CLBNhkTA4nD9T6Pb9_Jmi4UfQeQzsg"
    }
  };
};
