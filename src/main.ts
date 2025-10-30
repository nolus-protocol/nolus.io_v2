import '@/assets/main.css'
import { ViteSSG } from 'vite-ssg'
import { MotionPlugin } from '@vueuse/motion'
import App from './App.vue'
import type { RouteRecordRaw } from 'vue-router'
import { getMeta as getHomeMeta } from '@/router/metadata/homepage'
import { getMeta as getAboutMeta } from '@/router/metadata/about'
import { getMeta as getGovernanceMeta } from '@/router/metadata/governance'
import NotFound from '@/views/NotFound.vue'
import i18n from './i18n'

// Define routes for SSG with optional locale prefix
const routes: RouteRecordRaw[] = [
  // English routes (no locale prefix)
  {
    path: '/',
    name: 'home',
    component: () => import('./views/HomeView.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('./views/AboutView.vue')
  },
  {
    path: '/governance',
    name: 'governance',
    component: () => import('./views/GovernanceView.vue')
  },
  // Localized routes (with locale prefix for non-English)
  {
    path: '/:locale(ru|zh|es|fr|el|tr|id|ja|ko)',
    name: 'home-localized',
    component: () => import('./views/HomeView.vue')
  },
  {
    path: '/:locale(ru|zh|es|fr|el|tr|id|ja|ko)/about',
    name: 'about-localized',
    component: () => import('./views/AboutView.vue')
  },
  {
    path: '/:locale(ru|zh|es|fr|el|tr|id|ja|ko)/governance',
    name: 'governance-localized',
    component: () => import('./views/GovernanceView.vue')
  },
  // 404 catch-all
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

// Create SSG app
export const createApp = ViteSSG(
  App,
  { 
    routes
  } as any,
  ({ app, router, isClient }) => {
    // Add plugins
    app.use(i18n)
    app.use(MotionPlugin)
    
    // Add router navigation guard for dynamic metadata
    router.beforeEach((to, from, next) => {
      // Detect and set locale from URL
      const urlLocale = to.params.locale as string;
      if (urlLocale && ['ru', 'zh', 'es', 'fr', 'el', 'tr', 'id', 'ja', 'ko'].includes(urlLocale)) {
        i18n.global.locale.value = urlLocale;
        if (isClient) {
          localStorage.setItem('user-locale', urlLocale);
        }
      } else if (!urlLocale) {
        // For routes without locale prefix, use English
        i18n.global.locale.value = 'en';
        if (isClient) {
          localStorage.setItem('user-locale', 'en');
        }
      }
      
      // Update HTML lang attribute (works for both SSR and client)
      if (typeof document !== 'undefined') {
        const currentLocale = i18n.global.locale.value;
        document.documentElement.lang = currentLocale;
      }
      
      // Get metadata based on route name (handle both regular and localized routes)
      let meta;
      const routeName = to.name as string;
      if (routeName?.includes('home')) meta = getHomeMeta(i18n);
      else if (routeName?.includes('about')) meta = getAboutMeta(i18n);
      else if (routeName?.includes('governance')) meta = getGovernanceMeta(i18n);
      else meta = getHomeMeta(i18n); // Fallback for NotFound
      
      // Only manipulate DOM on client side
      if (!isClient) {
        next();
        return;
      }
      
      // Update page title
      if (meta && meta.title) {
        window.document.title = meta.title;
      }
      
      // Update Content-Language meta tag
      const currentLocale = i18n.global.locale.value;
      let contentLangTag = document.querySelector('meta[http-equiv="content-language"]') as HTMLMetaElement;
      if (!contentLangTag) {
        contentLangTag = document.createElement('meta');
        contentLangTag.setAttribute('http-equiv', 'content-language');
        document.head.appendChild(contentLangTag);
      }
      contentLangTag.setAttribute('content', currentLocale);
      
      // Add hreflang link tags for all supported languages
      const supportedLanguages = ['en', 'ru', 'zh', 'es', 'fr', 'el', 'tr', 'id', 'ja', 'ko'];
      
      // Remove existing hreflang tags
      document.querySelectorAll('link[hreflang]').forEach(link => link.remove());
      
      // Get current path without locale prefix
      const pathWithoutLocale = to.path.replace(/^\/(en|ru|zh|es|fr|el|tr|id|ja|ko)/, '');
      
      // Add hreflang for each language
      supportedLanguages.forEach(lang => {
        const link = document.createElement('link');
        link.rel = 'alternate';
        link.hreflang = lang;
        const langPrefix = lang !== 'en' ? `/${lang}` : '';
        link.href = `https://nolus.io${langPrefix}${pathWithoutLocale}`;
        document.head.appendChild(link);
      });
      
      // Add x-default for English (fallback)
      const defaultLink = document.createElement('link');
      defaultLink.rel = 'alternate';
      defaultLink.hreflang = 'x-default';
      defaultLink.href = `https://nolus.io${pathWithoutLocale}`;
      document.head.appendChild(defaultLink);
      
      // Update canonical URL
      if (meta && meta.canonical) {
        let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
        if (!canonicalLink) {
          canonicalLink = document.createElement('link');
          canonicalLink.setAttribute('rel', 'canonical');
          document.head.appendChild(canonicalLink);
        }
        canonicalLink.setAttribute('href', meta.canonical);
      }
      
      // Update meta tags
      const updateMetaTag = (property: string, content: string) => {
        let tag = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
        if (!tag) {
          tag = document.querySelector(`meta[name="${property}"]`) as HTMLMetaElement;
        }
        if (!tag) {
          tag = document.createElement('meta');
          if (property.startsWith('og:') || property.startsWith('twitter:')) {
            tag.setAttribute('property', property);
          } else {
            tag.setAttribute('name', property);
          }
          document.head.appendChild(tag);
        }
        tag.setAttribute('content', content);
      };
      
      if (meta) {
        if (meta.description) updateMetaTag('description', meta.description);
        if (meta.keywords) updateMetaTag('keywords', meta.keywords);
        if (meta['og:title']) updateMetaTag('og:title', meta['og:title']);
        if (meta['og:description']) updateMetaTag('og:description', meta['og:description']);
        if (meta['og:url']) updateMetaTag('og:url', meta['og:url']);
        if (meta['og:image']) updateMetaTag('og:image', meta['og:image']);
        if (meta['og:type']) updateMetaTag('og:type', meta['og:type']);
        if (meta['twitter:title']) updateMetaTag('twitter:title', meta['twitter:title']);
        if (meta['twitter:description']) updateMetaTag('twitter:description', meta['twitter:description']);
        if (meta['twitter:url']) updateMetaTag('twitter:url', meta['twitter:url']);
        if (meta['twitter:image']) updateMetaTag('twitter:image', meta['twitter:image']);
        if (meta['twitter:card']) updateMetaTag('twitter:card', meta['twitter:card']);
      }
      
      // Add Open Graph locale tags
      const localeMap: Record<string, string> = {
        'en': 'en_US',
        'ru': 'ru_RU',
        'zh': 'zh_CN',
        'es': 'es_ES',
        'fr': 'fr_FR',
        'el': 'el_GR',
        'tr': 'tr_TR',
        'id': 'id_ID',
        'ja': 'ja_JP',
        'ko': 'ko_KR'
      };
      
      // Set primary locale
      const ogLocale = localeMap[currentLocale] || 'en_US';
      updateMetaTag('og:locale', ogLocale);
      
      // Remove existing og:locale:alternate tags
      document.querySelectorAll('meta[property="og:locale:alternate"]').forEach(tag => tag.remove());
      
      // Add alternate locales for all other languages
      supportedLanguages.forEach(lang => {
        if (lang !== currentLocale) {
          const alternateMeta = document.createElement('meta');
          alternateMeta.setAttribute('property', 'og:locale:alternate');
          alternateMeta.setAttribute('content', localeMap[lang]);
          document.head.appendChild(alternateMeta);
        }
      });
      
      next();
    });
    
    // Client-only code
    if (isClient) {
      // Any client-specific initialization can go here
      console.log('Running in client mode')
    }
  }
)
