/**
 * ww-hero — Worn Wear full-height hero with brand brown bg + logo overlay.
 *
 * Authoring rows:
 *   row 0: background <picture> image OR plain text URL
 *   row 1: logo <picture> OR plain text URL OR text
 *   row 2: tagline paragraph
 */

/**
 * Convert plain-text image URLs in cells to <img> elements.
 * Supports both DA-editor authored content (picture elements) and
 * programmatic uploads (text URLs).
 */
function convertTextToImages(block) {
  block.querySelectorAll(':scope > div > div').forEach((cell) => {
    if (cell.querySelector('picture, img')) return;
    const text = cell.textContent.trim();
    if (
      text.match(/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp|svg)/i)
      || text.match(/^https?:\/\/.*\/(dw|image|media)\//i)
    ) {
      const img = document.createElement('img');
      img.src = text;
      img.alt = '';
      img.loading = 'lazy';
      cell.textContent = '';
      cell.appendChild(img);
    }
  });
}

export default async function decorate(block) {
  convertTextToImages(block);

  const rows = [...block.children];
  if (!rows.length) return;

  const bgPic = rows[0]?.querySelector('picture, img');
  const logoPic = rows[1]?.querySelector('picture, img');
  const tagline = rows[2]?.innerHTML || '';

  const inner = document.createElement('div');
  inner.className = 'ww-hero-inner';

  // Background
  if (bgPic) {
    const bg = document.createElement('div');
    bg.className = 'ww-hero-bg';
    bgPic.setAttribute('aria-hidden', 'true');
    bg.appendChild(bgPic);
    inner.appendChild(bg);
  }

  // Content
  const content = document.createElement('div');
  content.className = 'ww-hero-content';

  if (logoPic) {
    const logoWrap = document.createElement('div');
    logoWrap.className = 'ww-logo';
    logoWrap.appendChild(logoPic);
    content.appendChild(logoWrap);
  }

  if (tagline) {
    const p = document.createElement('p');
    p.className = 'ww-hero-tagline';
    p.innerHTML = tagline;
    content.appendChild(p);
  }

  inner.appendChild(content);

  // Scroll caret
  const caret = document.createElement('div');
  caret.className = 'ww-hero-caret';
  caret.setAttribute('aria-hidden', 'true');
  caret.innerHTML = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polyline points="6 9 12 15 18 9"/></svg>';
  inner.appendChild(caret);

  block.replaceChildren(inner);
}
