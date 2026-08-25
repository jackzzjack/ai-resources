(() => {
  const meta = document.querySelector('meta[name="page-updated"]');
  if (!meta?.content || document.querySelector('.page-updated-date')) return;

  const date = new Date(`${meta.content}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return;

  const label = document.createElement('time');
  label.className = 'page-updated-date';
  label.dateTime = meta.content;
  label.textContent = `最後更新：${new Intl.DateTimeFormat('zh-Hant-TW', {
    year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC'
  }).format(date)}`;

  const style = document.createElement('style');
  style.textContent = '.page-updated-date{display:inline-block;margin-top:.5rem;color:inherit;opacity:.78;font-size:.85em;white-space:nowrap}';
  document.head.append(style);

  const footer = document.querySelector('footer');
  if (footer) {
    footer.append(document.createTextNode(' · '), label);
  } else {
    label.style.cssText = 'position:fixed;right:1rem;bottom:1rem;padding:.35rem .6rem;border-radius:.4rem;background:#0009;z-index:10';
    document.body.append(label);
  }
})();
