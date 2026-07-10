(() => {
  const measurementId = 'G-PR0C9L2M5X';
  const consentKey = 'ai-resources-analytics-consent';

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;

  gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  });
  gtag('js', new Date());
  gtag('config', measurementId, { send_page_view: false });

  const sendPageView = () => gtag('event', 'page_view', {
    page_location: window.location.href,
    page_path: window.location.pathname,
    page_title: document.title,
  });

  const loadAnalytics = () => {
    if (document.querySelector('script[data-ga-loader]')) return;
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
    script.dataset.gaLoader = 'true';
    document.head.appendChild(script);
  };

  const setConsent = (granted) => {
    const value = granted ? 'granted' : 'denied';
    gtag('consent', 'update', {
      analytics_storage: value,
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    });
    localStorage.setItem(consentKey, granted ? 'granted' : 'denied');
    if (granted) {
      loadAnalytics();
      sendPageView();
    }
  };

  const showConsentBanner = () => {
    const banner = document.createElement('section');
    banner.id = 'analytics-consent';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', '網站分析 Cookie 同意');
    banner.innerHTML = `
      <p>本網站可使用 Google Analytics 4 進行匿名瀏覽量統計，僅在你同意後送出 page_view。<br>
      <small>我們不使用廣告、個人化或使用者資料追蹤。你可隨時在瀏覽器清除網站資料以變更選擇。</small></p>
      <div>
        <button type="button" data-analytics-choice="deny">不使用分析</button>
        <button type="button" data-analytics-choice="accept">同意分析</button>
      </div>`;
    Object.assign(banner.style, {
      position: 'fixed', bottom: '1rem', left: '1rem', right: '1rem', zIndex: '9999',
      maxWidth: '48rem', margin: '0 auto', padding: '1rem', borderRadius: '0.75rem',
      background: '#171724', color: '#f4f3ff', border: '1px solid #7c6aff',
      boxShadow: '0 0.75rem 2rem rgba(0, 0, 0, 0.35)', fontFamily: 'system-ui, sans-serif',
    });
    banner.querySelectorAll('[data-analytics-choice]').forEach((button) => {
      Object.assign(button.style, {
        margin: '0.25rem', padding: '0.5rem 0.75rem', borderRadius: '0.4rem', cursor: 'pointer',
      });
      button.addEventListener('click', () => {
        setConsent(button.dataset.analyticsChoice === 'accept');
        banner.remove();
      });
    });
    document.body.appendChild(banner);
  };

  const savedConsent = localStorage.getItem(consentKey);
  if (savedConsent === 'granted') {
    setConsent(true);
  } else if (savedConsent !== 'denied') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', showConsentBanner, { once: true });
    } else {
      showConsentBanner();
    }
  }
})();
