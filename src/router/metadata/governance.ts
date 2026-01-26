import type { I18n, Composer } from 'vue-i18n';

export const getMeta = (i18n: I18n) => {
  const locale = typeof i18n.global.locale === 'string' ? i18n.global.locale : i18n.global.locale.value;
  const t = (key: string) => (i18n.global as Composer).t(key) as string;
  
  const baseUrl = 'https://nolus.io';
  const localePrefix = locale !== 'en' ? `/${locale}` : '';
  
  return {
    title: t('meta_governance_title'),
    description: t('meta_governance_description'),
    keywords: t('meta_governance_keywords'),
    canonical: `${baseUrl}${localePrefix}/governance`,

    "og:type": "website",
    "og:url": `${baseUrl}${localePrefix}/governance`,
    "og:title": t('meta_governance_ogTitle'),
    "og:description": t('meta_governance_ogDescription'),
    "og:image": `${baseUrl}/assets/images/meta/governance-meta.jpg`,

    "twitter:card": "summary_large_image",
    "twitter:url": `${baseUrl}${localePrefix}/governance`,
    "twitter:title": t('meta_governance_twitterTitle'),
    "twitter:description": t('meta_governance_twitterDescription'),
    "twitter:image": `${baseUrl}/assets/images/meta/governance-meta.jpg`,

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
      name: t('meta_governance_videoName'),
      uploadDate: "2022-10-24",
      duration: "PT0H1M47S",
      contentUrl: "https://www.youtube.com/watch?v=k7QWPR0052g",
      embedUrl: "https://www.youtube.com/embed/k7QWPR0052g",
      thumbnailUrl:
        "https://i9.ytimg.com/vi/k7QWPR0052g/mqdefault.jpg?v=635641f9&sqp=CPC145oG&rs=AOn4CLBNhkTA4nD9T6Pb9_Jmi4UfQeQzsg"
    },
    "script-webpage": {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: t('meta_governance_title'),
      description: t('meta_governance_description'),
      url: `${baseUrl}${localePrefix}/governance`,
      inLanguage: locale,
      isPartOf: {
        "@type": "WebSite",
        "@id": "https://nolus.io/#website",
        url: "https://nolus.io/",
        name: "Nolus Protocol"
      },
      about: {
        "@type": "Organization",
        name: "Nolus Protocol"
      },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: `${baseUrl}/assets/images/meta/governance-meta.jpg`
      }
    },
    "script-breadcrumb": {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${baseUrl}${localePrefix}/`
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Governance",
          item: `${baseUrl}${localePrefix}/governance`
        }
      ]
    }
  };
};
