/**
 * ww-hero — Worn Wear full-height hero with brand brown bg + logo overlay.
 *
 * Authoring rows:
 *   row 0: background <picture> image
 *   row 1: logo <picture> or text
 *   row 2: tagline paragraph
 */
export default async function decorate(block) {
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
