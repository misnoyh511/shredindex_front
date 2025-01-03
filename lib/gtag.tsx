// Declare gtag as a global function
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event',
      targetId: string,
      config?: {
        page_path?: URL;
        event_category?: string;
        event_label?: string;
        value?: number;
        [key: string]: never;
      }
    ) => void;
  }
}

export const GA_TRACKING_ID = process.env.GA_TRACKING_ID;

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: URL): void => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};

type GTagEvent = {
  action: string;
  category: string;
  label: string;
  value: number;
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: GTagEvent): void => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
  });
};

// Common event categories
export const EventCategory = {
  ENGAGEMENT: 'engagement',
  SEARCH: 'search',
  FILTER: 'filter',
  RESORT: 'resort',
  USER: 'user',
  NAVIGATION: 'navigation',
} as const;

// Common event actions
export const EventAction = {
  CLICK: 'click',
  VIEW: 'view',
  SEARCH: 'search',
  FILTER: 'filter',
  SORT: 'sort',
  FAVORITE: 'favorite',
  SHARE: 'share',
} as const;

// Helper functions for common events
export const trackResortView = (resortName: string): void => {
  event({
    action: EventAction.VIEW,
    category: EventCategory.RESORT,
    label: resortName,
    value: 1,
  });
};

export const trackSearch = (searchTerm: string): void => {
  event({
    action: EventAction.SEARCH,
    category: EventCategory.SEARCH,
    label: searchTerm,
    value: 1,
  });
};

export const trackFilter = (filterName: string, filterValue: string): void => {
  event({
    action: EventAction.FILTER,
    category: EventCategory.FILTER,
    label: `${filterName}:${filterValue}`,
    value: 1,
  });
};

export const trackSort = (sortType: string): void => {
  event({
    action: EventAction.SORT,
    category: EventCategory.ENGAGEMENT,
    label: sortType,
    value: 1,
  });
};

export const trackFavorite = (resortName: string): void => {
  event({
    action: EventAction.FAVORITE,
    category: EventCategory.ENGAGEMENT,
    label: resortName,
    value: 1,
  });
};

export const trackShare = (resortName: string, platform: string): void => {
  event({
    action: EventAction.SHARE,
    category: EventCategory.ENGAGEMENT,
    label: `${resortName}:${platform}`,
    value: 1,
  });
};

// Initialize GA script
export const initGA = (): void => {
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag(...args: any[]) {
    window.dataLayer.push(args);
  }
  gtag('js', new Date());
  gtag('config', GA_TRACKING_ID);
};
